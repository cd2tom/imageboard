const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    posts: [Post]
  }
  type Board {
    id: ID!
    name: String!
    handle: String!
    createdAt: String!
    updatedAt: String!
    totalThreads: Int!
    threads(limit: Int!, offset: Int): [Post]
    thread(id: Int!): Post
  }
  type Post {
    id: ID!
    subject: String
    name: String
    body: String!
    threadsId: ID!
    userdId: Int
    createdAt: String!
    updatedAt: String!
    thread: Post
    posts(limit: Int, order: String): [Post]
    totalPosts: Int
    user: User
  }
  type Query {
    users: [User]
    boards: [Board]
    board(handle: String!): Board
    threads(limit: Int!): [Post]
    thread(id: ID!): Post
  }
  type Mutation {
    createPost(name: String, body: String!, threadsId: Int!): Int
    createThread(
      name: String
      body: String!
      subject: String
      boardsId: Int!
    ): Int
  }
`;

module.exports = typeDefs;
