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
    two_FactAuth : Two_FactAuth

  
  }
  type Two_FactAuth  { 
    code : String! 
    expiresAt: DateTime!

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
  input twoFactorAuthUserInput { 
    code : String!
    expiresAt: DateTime!

  }

  input ImageInput {
    url: String!
    contentType: String!
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
  }
  type ForgetpwdResponse{
    message:String!
    mailstatus:Boolean!
  }
  input ForgetpwdInput{
    email: String!
    subject:String!
  }











  input twoFactorAuthInput{
    email: String!
  }
  type twoFactorAuthResponse{
    message:String!
    statusCode:Boolean!

  }


  input verifyOTPInput{
    email: String!
    otp:String!
  }
  type verifyOTPResponse{
    message:String!
    statusCode:Boolean!
  }








  

  
  type SignupResponse{
    message: String!
    emailExists: Boolean!
    usernameExists: Boolean!
  }

  type Query {
    getUser(id: ID!): User!
    getUsers: [User!]!
  }

  type Mutation {
    signup(input: UserInput!): SignupResponse!
    signin(input: signinInput!): LoginResponse!
    resetpwd(input:ForgetpwdInput!):ForgetpwdResponse!
    sendOTPVerificationEmail(input:twoFactorAuthInput!):twoFactorAuthResponse!

    verifyOTP(input:verifyOTPInput!):twoFactorAuthResponse!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): User!
    toggleBlockUser(id: ID!): User!
  }
`;

module.exports = typeDefs;



