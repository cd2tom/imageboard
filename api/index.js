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
    createdAt: String!
    id: ID!
  }
  type Board {
    name: String!
    handle: String!
    createdAt: String!
    threads: [Thread]
    id: ID!
  }
  type Thread {
    name: String
    boardsId: ID!
    createdAt: String!
    board: Board!
    id: ID!
  }
  type Post {
    name: String
    body: String!
    threadsId: ID!
    userdId: Int
    createdAt: String!
    thread: Thread!
    id: ID!
  }
  type Query {
    users: [User]
    boards: [Board]
    board(id: ID!): Board
    asdf(id: ID!): Board
    threads: [Thread]
    posts: [Post]
  }
  type Mutation {
    addUser(name: String!, email: String!): Int
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      const users = await database("users").select();
      return users;
    },
    boards: async () => {
      const boards = await database("boards").select();
      return boards;
    },
    board: async (_, { id }) => {
      const [board] = await database("boards").where({ id });
      const threads = await database("threads").where({ boardsId: board.id });
      return { ...board, threads };
    },
    threads: async () => {
      const threads = await database("threads").select();
      return threads;
    },
    posts: async () => {
      const posts = await database("posts").select();
      return posts;
    }
  },
  Mutation: {
    addUser: async (_, { name, email }) => {
      const [id] = await database("users")
        .returning("id")
        .insert({ name, email });
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
