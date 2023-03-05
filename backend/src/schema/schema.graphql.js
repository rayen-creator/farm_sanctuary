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
   image: Image
  }
  
  type Image {
  url: String!
  contentType: String!
}
  
  input UserInput {
  username: String!
  email: String!
  password: String!
  isActive: Boolean!
  role: Role!
  image: ImageInput
}

input ImageInput {
  url: String!
  contentType: String!
}
type deliveryAgent {
  id: ID!
  login: String!
  password: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  longitude: String!
  latitude: String!
}
type loginDriverResponse {
  login:String!
  message:String!
}
input deliveryAgentInput {
    login: String!
    password: String!
}
input UpdateUserInput {
    id: ID!
    login: String!
    password: String!
  }
input loginDriverInput {
    login: String!
    password: String!
  }
input AgentLocationInput {
    id: ID!
    longitude: String!
    latitude: String!
}

  type Query {
    getUser(id: ID!): User!
    getUsers: [User!]!
    getdeliveryAgent(id: ID!): deliveryAgent!
    getdeliveryAgents: [deliveryAgent!]! 
  }

  type Mutation {
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): User!
    toggleBlockUser(id: ID!): User!

    loginDriver(input: loginDriverInput!):loginDriverResponse!
    createdeliveryAgent(input: deliveryAgentInput!): deliveryAgent!
    updatedeliveryAgent(input: UpdateUserInput!): deliveryAgent!
    updateLocation(input: AgentLocationInput!): deliveryAgent!
    deletedeliveryAgent(id: ID!): deliveryAgent!
  }
`;

module.exports = typeDefs;