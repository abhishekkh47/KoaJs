import { gql } from "apollo-server-express";

export const authTypeDefs = gql`
  type AuthPayload {
    token: String!
    user: User!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Mutation {
    signup(input: UserInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;
