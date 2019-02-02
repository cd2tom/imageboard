const { gql } = require("apollo-server-express");

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

module.exports = typeDefs;
