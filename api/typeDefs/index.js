const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    posts: [Post]
  }
  type Board {
    id: ID!
    name: String!
    handle: String!
    createdAt: String!
    threads: [Post]
  }
  type Post {
    id: ID!
    subject: String
    name: String
    body: String!
    threadsId: ID!
    userdId: Int
    createdAt: String!
    thread: Post
    posts: [Post]
    user: User
  }
  type Query {
    users: [User]
    boards: [Board]
    board(handle: String!): Board
    threads: [Post]
    thread(id: ID!): Post
    posts: [Post]
    post(id: ID!): Post
  }
  type Mutation {
    addUser(name: String!, email: String!): Int
  }
`;

module.exports = typeDefs;
