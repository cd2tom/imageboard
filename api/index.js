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
      console.log(name, body, threadsId);
      const [id] = await database("posts")
        .returning("id")
        .insert({ name, body, threadsId });
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
