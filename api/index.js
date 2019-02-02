require("dotenv").config();

const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const database = require("./database");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const Board = require("./models/board");

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
    posts: [Post]
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
    threads: [Thread]
    thread(id: ID!): Thread
    posts: [Post]
    post(id: ID!): Post
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
      const threads = database("threads")
        .select(database.raw("json_agg(threads.*)"))
        .whereRaw(`threads."boardsId" = boards.id`)
        .as("threads");

      const boards = await database("boards")
        .leftJoin("threads", "boards.id", "threads.boardsId")
        .select("boards.*", threads)
        .groupBy("boards.id");

      return boards;
    },
    board: async (_, { id }) => {
      const threads = database("threads")
        .select(database.raw("json_agg(threads.*)"))
        .where({ boardsId: id })
        .as("threads");

      const [board] = await database("boards")
        .where({ "boards.id": id })
        .leftJoin("threads", "boards.id", "threads.boardsId")
        .select("boards.*", threads);

      return board;
    },
    threads: async () => {
      const posts = database("posts")
        .select(database.raw("json_agg(posts.*)"))
        .whereRaw(`posts."threadsId" = threads.id`)
        .as("posts");

      const threads = await database("threads")
        .leftJoin("posts", "threads.id", "posts.threadsId")
        .select("threads.*", posts)
        .groupBy("threads.id");
      return threads;
    },
    thread: async (_, { id }) => {
      const posts = database("posts")
        .select(database.raw("json_agg(posts.*)"))
        .where({ threadsId: id })
        .as("posts");

      const [thread] = await database("threads")
        .leftJoin("posts", "threads.id", "posts.threadsId")
        .select("threads.*", posts)
        .groupBy("threads.id");

      return thread;
    },
    posts: async () => {
      const posts = await database("posts").select();
      return posts;
    },
    post: async (_, { id }) => {
      const [post] = await database("posts").where({ id });
      return post;
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
