const { gql } = require("apollo-server-express");
const typeDefs = gql`
  scalar DateTime

  enum Role {
    FARMER
    CLIENT
    ADMIN
  }

  enum Gender{
    MALE
    FEMALE
  }

  type User {
    id: ID!
    username: String!
    email: String!
    phone:Int!
    password: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    isActive: Boolean!
    isBlocked: Boolean!
    gender:Gender!
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
    phone:Int!
    password: String!
    isActive: Boolean!
    gender:Gender!
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
  fullName: String!
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
    fullName: String!
    email: String!
    phone: Int!
    image: ImageInput
     input signinInput {
    email: String!
    password: String!
  }
  type LoginResponse {
    accessToken: String!
    username: String!
    message: String!
    expiresIn: Int!
  }
  type ForgetpwdResponse{
    message:String!
    mailstatus:Boolean!
  }
  input ForgetpwdInput{
    email: String!
    subject:String!
  }
  type SignupResponse{
    message: String!
    emailExists: Boolean!
    usernameExists: Boolean!
  }
}
input AgentInput {
    login: String!
    password: String!
    fullName: String!
    email: String!
    phone: Int!
    
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
    signup(input: UserInput!): SignupResponse!
    signin(input: signinInput!): LoginResponse!
    resetpwd(input:ForgetpwdInput!):ForgetpwdResponse!

    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): User!
    toggleBlockUser(id: ID!): User!

    createdeliveryAgent(input: deliveryAgentInput!): deliveryAgent!

    updatedeliveryAgent(id: ID! ,input:AgentInput!): deliveryAgent!

    updateLocation( input: AgentLocationInput!): deliveryAgent!
    deletedeliveryAgent(id: ID!): deliveryAgent!
    loginDriver(input: loginDriverInput!):loginDriverResponse!
}
`;

module.exports = typeDefs;
