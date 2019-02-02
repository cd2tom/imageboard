require("dotenv").config();

const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const database = require("./database");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const typeDefs = gql`
  type User {
    name: String!
    email: String!
    id: Int!
  }
  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      const users = await database("users").select();
      console.log(users);
      return users;
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
