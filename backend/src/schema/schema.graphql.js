const { gql } = require("apollo-server-express");
const typeDefs = gql`
  scalar DateTime
  scalar Upload

  enum Role {
    FARMER
    CLIENT
    ADMIN
  }

  enum Category {
    TECHNICAL
    NON_TECHNICAL
    FUNCTIONAL
  }

  enum Unit {
    KG
    GRAM
    LITRE
    COUNT
  }
  enum productCategory {
    FRUITS
    VEGETABLES
    DAIRY
    MEAT
    GRAINS
    NUTS
    HERBS
    SPICES
    HONEY
    MUSHROOMS
    OTHER
  }

  type Feedback {
    id: ID!
    title: String!
    subject: String!
    content: String!
    category: Category!
    rating: Int!
  }

  input FeedbackInput {
    title: String!
    subject: String!
    content: String!
    rating: Int!
    category: Category!
  }

  enum Gender {
    MALE
    FEMALE
  }

  type User {
    id: ID!
    username: String!
    email: String!
    phone: Int!
    password: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    isActive: Boolean!
    isBlocked: Boolean!
    gender: Gender!
    role: Role!
    image: String
    two_FactAuth_Option: Boolean!
    location: String
    email_change_option: Boolean
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    unit: String!
    country: String!
    user: User!
    expirationDate: DateTime!
    rating: Rating
    reviews: [Review]
    category: productCategory!
    createdAt: DateTime!
    updatedAt: DateTime!
    image: String!
  }

  type Rating {
    total: Int!
    count: Int!
    average: Float!
  }

  type Review {
    id: ID!
    userReview: User!
    rating: Int!
    comment: String!
    createdAt: DateTime!
  }
  

  type Two_FactAuth {
    code: String!
    expiresAt: DateTime!
  }

  type emailChange {
    code: String!
    expiresAt: DateTime!
  }

  input UserInput {
    username: String!
    email: String!
    phone: Int!
    password: String!
    isActive: Boolean!
    gender: Gender!
    role: Role!
    image: Upload
    two_FactAuth_Option: Boolean
    location: String
  }
  input twoFactorAuthUserInput {
    code: String!
    expiresAt: DateTime!
  }
  input emailChangeUserInput {
    code: String!
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
    login: String!
    message: String!
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
    user: User
    accessToken: String!
    message: String!
    expiresIn: Int!
    userfound: Boolean!
    passwordIsValid: Boolean!
  }
  type ForgetpwdResponse {
    message: String!
    mailstatus: Boolean!
  }
  type acilResponse {
    message: String!
  }
  input ForgetpwdInput {
    email: String!
  }

  
  input verifyOTPInput {
    username: String!
    otp: String!
  }
  type verifyOTPResponse {
    message: String!
    statusCode: Boolean!
  }

  input verifyEmailChangeOTPInput {
    username: String!
    otp: String!
  }
  type verifyEmailChangeOTPResponse {
    message: String!
    statusCode: Boolean!
  }

  input emailChangeInput {
    username: String!
  }

  type emailChangeResponse {
    message: String!
    statusCode: Boolean!
  }

  input twoFactorAuthInput {
    username: String!
  }
  type twoFactorAuthResponse {
    message: String!
    statusCode: Boolean!
  }
  type SignupResponse {
    message: String!
    emailExists: Boolean!
    usernameExists: Boolean!
  }
  type DriverResponse {
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

  type UpdatepwdResponse {
    message: String!
    updateStatus: Boolean!
    userFound: Boolean!
  }

  input resetpwd {
    email: String!
    password: String!
    token: String!
  }

  input updateEmail {
    username: String!
    email: String!
  }

  type UpdateEmailResponse {
    message: String!
    updateStatus: Boolean!
    userFound: Boolean!
    emailExist: Boolean!
  }
  type UserUpdateResponse {
    message: String!
    usernameExists: Boolean!
  }
  input checkresettoken {
    token: String!
    email: String!
  }
  type checkresettokenResponse {
    valid: Boolean!
    message: String!
  }
  input AgentLocationInput {
    id: ID!
    longitude: String!
    latitude: String!
  }
  type createProductResponse {
    message: String!
  }
  type Query {
    getUser(id: ID!): User!
    getUsers: [User!]!
    
    
    getdeliveryAgent(id: ID!): deliveryAgent!
    getdeliveryAgents: [deliveryAgent!]!

    
    getFeedback(id: ID!): Feedback!
    getFeedbacks: [Feedback!]!

    
    getProducts: [Product!]!
    getProduct(id: ID!): Product!
    getProductsByUser(userId: ID!): [Product!]!
  }

  type Mutation {
    signup(input: UserInput!): SignupResponse!
    signin(input: signinInput!): LoginResponse!
    sendmail(input: ForgetpwdInput!): ForgetpwdResponse!
    sendOTPVerificationEmail(input: twoFactorAuthInput!): twoFactorAuthResponse!
    sendOTPVerificationSms(input: emailChangeInput!): emailChangeResponse!
    resetpwd(input: resetpwd!): UpdatepwdResponse!
    updateEmail(input: updateEmail!): UpdateEmailResponse!
    checkresettoken(input: checkresettoken!): checkresettokenResponse!

    verifyOTP(input: verifyOTPInput!): twoFactorAuthResponse!
    verifyEmailChangeOTP(
      input: verifyEmailChangeOTPInput!
    ): emailChangeResponse!
    updateUser(id: ID!, input: UserInput!, file: Upload): UserUpdateResponse!
    deleteUser(id: ID!): User!
    toggleBlockUser(id: ID!): User!

    infomail(input: AgentInput!): acilResponse

    createdeliveryAgent(input: AgentInput!): DriverResponse!
    updatedeliveryAgent(id: ID!, input: AgentInput!): DriverResponse!

    updateLocation(input: AgentLocationInput!): deliveryAgent!
    deletedeliveryAgent(id: ID!): deliveryAgent!
    loginDriver(input: loginDriverInput!): loginDriverResponse!

    createFeedback(input: FeedbackInput!): Feedback!
    updateFeedback(id: ID!, input: FeedbackInput!): Feedback!
    deleteFeedback(id: ID!): Feedback!


    createProduct(input: CreateProductInput!, file: Upload): createProductResponse!
    updateProduct(id: ID!, input: UpdateProductInput!, file: Upload): createProductResponse!
    deleteProduct(id: ID!): Product!
  }

  input CreateProductInput {
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    unit: String!
    user: ID!
    expirationDate: DateTime!
    category: productCategory!
  }

  input UpdateProductInput {
    name: String
    description: String
    price: Float
    quantity: Int
    unit: String
    country: String
    user: ID
    expirationDate: DateTime
    category: productCategory
  }



`;

module.exports = typeDefs;
