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
  email: String!
  password: String!
  phone: Int!
  image: Image
  createdAt: DateTime!
  updatedAt: DateTime!
  longitude: String
  latitude: String
}
type loginDriverResponse {
  login:String!
  message:String!
}
input loginDriverInput {
    login: String!
    password: String!
  }
input deliveryAgentInput {
    login: String!
    password: String!
    email: String!
    phone: Int!
    image: ImageInput!
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
    createdeliveryAgent(input: deliveryAgentInput!): deliveryAgent!
    updatedeliveryAgent(input: deliveryAgentInput!): deliveryAgent!
    updateLocation( input: AgentLocationInput!): deliveryAgent!
    deletedeliveryAgent(id: ID!): deliveryAgent!
    loginDriver(input: loginDriverInput!):loginDriverResponse!
}
`;

module.exports = typeDefs;