const { gql } = require('apollo-server-express');
const typeDefs = gql`

scalar DateTime

enum Role {
  FARMER
  CLIENT
  ADMIN
}


  type User {
  id: ID!
  username: String!
  email: String!
  password: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  isActive: Boolean!
  isBlocked: Boolean!
  role: Role!
  }
  
  input UserInput {
  username: String!
  email: String!
  password: String!
  isActive: Boolean!
  role: Role!
}



  type Query {
    getUser(id: ID!): User!
    getUsers: [User!]!
  }

  type Mutation {
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): User!
  }
`;

module.exports = typeDefs;