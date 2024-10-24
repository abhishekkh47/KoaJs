import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
  }

  input GetUserById {
    userId: ID!
  }

  type Query {
    users: [User!]!
    userNames: [String!]!
    getUserById(userId: ID!): User!
  }
`;
