require("dotenv").config();

global.database = require("knex")(
  require("./knexfile")[process.env.NODE_ENV || "development"]
);

const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const PORT = process.env.PORT;
const HOST = process.env.HOST || "localhost";

const typeDefs = require("./typeDefs");

const usersResolvers = require("./resolvers/users");
const boardsResolvers = require("./resolvers/boards");
const threadsResolvers = require("./resolvers/threads");

const resolvers = {
  Query: {
    ...usersResolvers,
    ...boardsResolvers,
    ...threadsResolvers
  },
  Mutation: {
    createPost: async (_, { name, body, threadsId }) => {
      const [{ count }] = await global
        .database("posts")
        .where({ threadsId })
        .count("id");
      if (count < 300) {
        const [id] = await global
          .database("posts")
          .returning("id")
          .insert({ name, body, threadsId });
        await global
          .database("posts")
          .where({ id: threadsId })
          .update({ updatedAt: new Date() });
        return id;
      } else {
        throw new Error("Reply limit reached");
      }
    },
    createThread: async (_, { name, body, subject, boardsId }) => {
      const [id] = await global
        .database("posts")
        .returning("id")
        .insert({ name, body, subject, boardsId });

      const [{ count }] = await global
        .database("posts")
        .where({ threadsId: null, archived: false })
        .count("id");

      if (count > 225) {
        const [threadToArchive] = await global
          .database("posts")
          .where({ threadsId: null })
          .orderBy("updatedAt", "asc");

        await global
          .database("posts")
          .where({ id: threadToArchive.id })
          .update({ archived: true });
      }

      return id;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(
    `Go to http://${HOST}:${PORT}${server.graphqlPath} to run queries!`
  );
});
