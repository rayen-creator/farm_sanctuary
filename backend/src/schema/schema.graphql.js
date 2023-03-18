const { gql } = require("apollo-server-express");
const typeDefs = gql`
  scalar DateTime
  scalar Upload
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
    image: String
    two_FactAuth_Option:Boolean!  
  }
  type Two_FactAuth  { 
    code : String! 
    expiresAt: DateTime!

  }

 

  input UserInput {
    username: String!
    email: String!
    phone:Int!
    password: String!
    isActive: Boolean!
    gender:Gender!
    role: Role!
    image: Upload
    two_FactAuth_Option: Boolean

  }
  input twoFactorAuthUserInput { 
    code : String!
    expiresAt: DateTime!

  }

  
type deliveryAgent {
  id: ID!
  login: String!
  fullName: String!
  email: String!
  password: String!
  phone: Int!
  image: String
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

  input signinInput {
    email: String!
    password: String!
  }
  type LoginResponse {
    accessToken: String!
    username: String!
    message: String!
    expiresIn: Int!
    userfound:Boolean!
    passwordIsValid:Boolean!
    blocked:Boolean!
    role:Role
    two_FactAuth_Option: Boolean
  }
  type ForgetpwdResponse{
    message:String!
    mailstatus:Boolean!
  }
  type acilResponse{
    message:String!
    
  }
  input ForgetpwdInput{
    email: String!
  }











  


  input verifyOTPInput{
    username: String!
    otp:String!
  }
  type verifyOTPResponse{
    message:String!
    statusCode:Boolean!
  }






  input twoFactorAuthInput{
    username: String!
  }
  type twoFactorAuthResponse{
    message:String!
    statusCode:Boolean!

  }
  type SignupResponse{
    message: String!
    emailExists: Boolean!
    usernameExists: Boolean!
  }
  type DriverResponse{
    message: String!
    emailExists: Boolean!
    loginExists: Boolean!
  }

input AgentInput {
    login: String!
    password: String!
    fullName: String!
    email: String!
    phone: Int!
}


  type UpdatepwdResponse{
    message: String!
    updateStatus:Boolean!
    userFound:Boolean!
  }

  input resetpwd{
    email: String!
    password:String!
    token:String!
  }

 
  input checkresettoken{
    token:String!
    email:String!
  }
  type checkresettokenResponse{
    valid: Boolean!
    message:String!
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
    sendmail(input:ForgetpwdInput!):ForgetpwdResponse!
    sendOTPVerificationEmail(input:twoFactorAuthInput!):twoFactorAuthResponse!
    resetpwd(input:resetpwd!):UpdatepwdResponse!
    checkresettoken(input:checkresettoken!):checkresettokenResponse!

    verifyOTP(input:verifyOTPInput!):twoFactorAuthResponse!
    updateUser(id: ID!, input: UserInput!, file: Upload!): User!
    deleteUser(id: ID!): User!
    toggleBlockUser(id: ID!): User!

    infomail(input: AgentInput!):acilResponse

    createdeliveryAgent(input: AgentInput!): DriverResponse!
    updatedeliveryAgent(id: ID! ,input:AgentInput!): DriverResponse!

    updateLocation( input: AgentLocationInput!): deliveryAgent!
    deletedeliveryAgent(id: ID!): deliveryAgent!
    loginDriver(input: loginDriverInput!):loginDriverResponse!
}
`;

module.exports = typeDefs;



