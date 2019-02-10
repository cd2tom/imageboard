require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const database = require("./database");

const PORT = process.env.PORT || 3000;
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
      const [{ count }] = await database("posts")
        .where({ threadsId })
        .count("id");
      if (count < 300) {
        const [id] = await database("posts")
          .returning("id")
          .insert({ name, body, threadsId });
        await database("posts")
          .where({ id: threadsId })
          .update({ updatedAt: new Date() });
        return id;
      } else {
        throw new Error("Reply limit reached");
      }
    },
    createThread: async (_, { name, body, subject, boardsId }) => {
      const [id] = await database("posts")
        .returning("id")
        .insert({ name, body, subject, boardsId });

      const [{ count }] = await database("posts")
        .where({ threadsId: null, archived: false })
        .count("id");

      if (count > 225) {
        const [threadToArchive] = await database("posts")
          .where({ threadsId: null })
          .orderBy("updatedAt", "asc");

        await database("posts")
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
