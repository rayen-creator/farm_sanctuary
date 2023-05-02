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

  enum Topic {
    farming
    agriculture
    ranching
  }

  type Badge{
    id:ID
    image: String
    name: String
    description:String
    createdAt: DateTime
    updatedAt:DateTime
  }

  type Comment {
    id: ID!
    content: String
    createdAt: DateTime
    updatedAt:DateTime
    user:User
    post:Post
  }

  type Post {
    id: ID
    image: String
    title: String
    text: String
    likes: Int
    topic: Topic
    createdAt: DateTime
    updatedAt: DateTime
    user: User
    comments:[Comment]
  }

  type Feedback {
    id: ID!
    title: String!
    subject: String!
    content: String!
    category: Category!
    rating: Int
    createdAt:DateTime
    user: User!

  }

  type CartItem {
    name: String!
    price: Float!
    total: Float!
    image: String!
    unit: String!
    quantity: Int!
  }

  type Order {
    id: ID!
    cartItems: [CartItem!]!
    totalPrice: Float!
    user: User
    farmer: User
    isDelivered: Boolean!
    createdAt: DateTime
    updatedAt: DateTime
    isConfirmed: Boolean!
    location: Location!
  }

  type Location {
    codePostal: String
  country: String
  state: String
  houseStreetnumber: String
  city: String
  }

  input CartItemInput {
    name: String!
    price: Float!
    total: Float!
    image: String!
    unit: String!
    quantity: Int!
  }

  input CreateOrderInput {
    cartItems: [CartItemInput!]
    totalPrice: Float
    userId: ID
    farmerId: ID
    location: LocationInput
  }

  input LocationInput {
    codePostal: String!
    country: String!
   state: String!
   houseStreetnumber: String!
   city: String!
  }

  input FeedbackInput {
    title: String!
    subject: String!
    content: String!
    rating: Int!
    category: Category!
    user: ID!
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
    two_FactAuth_Option: Boolean
    location: String
    email_change_option: Boolean
    likedPost:[Post]
    badges:[Badge]
    notifications:[Notification]
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
    inSale: Boolean!
    expirationDiscount: Boolean!
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
    location: String!
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
    orders:[Order]
  }
  type loginDriverResponse {
    message: String!
    userfound: Boolean!
    passwordIsValid: Boolean!
    agent: deliveryAgent
  }
  input loginDriverInput {
    login: String!
    password: String!
  }


  type RecommendedProduct {
    id: ID!
    title: String!
    price: Float!
    image: String!
    url: String!
    category: String!
  }

  enum recommendedproductCategory {
    Inputs
    Workshop
    Tyres
  }

  type Notification {
    id: ID!
    createdAt: DateTime!
    content: String!
    type: NotificationType!
    recipient: User!
    seen: Boolean!
  }

  enum NotificationType {
    PAIEMENT
    PRODUCT
    DELIVERY
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

  type addOrderResponse {
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

  type RecommendedProduct {
    id: ID!
    title: String!
    price: Float!
    image: String!
    url: String!
    category: String!
  }

  enum recommendedproductCategory {
    Inputs
    Workshop
    Tyres
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

  input postInput {
    image: String
    title: String!
    text: String!
    topic: Topic!
    user: ID
    comments: ID
  }
  input commentInput {
    content: String!
    user: ID
    post: ID
  }

  type addReviewResponse {
      reviewExist: Boolean!
      message: String!
  }
  
  type badgeResponse{
    name:String
    image:String
    description:String
  }

  input faceIDInput{
    id:String
    faceImage:String
  }
  type getcordResponse {
  latitude: Float
  longitude: Float
  address: String
  }
 


  type Query {
    
    getcord(address: String!): getcordResponse
    getUser(id: ID!): User!
    getUsers: [User!]!

    getdeliveryAgent(id: ID!): deliveryAgent!
    getdeliveryAgents: [deliveryAgent!]!
    getOrdersbyAgent(id: ID!):[Order]

    getAvailableAgent: deliveryAgent!

    getFeedback(id: ID!): Feedback!
    getFeedbacks: [Feedback!]!
    getFeedbackPerUser(userId: ID!): [Feedback!]!
    getFiveStarFeedbacks: [Feedback!]!
    
    getProducts: [Product!]!
    getProduct(id: ID!): Product!
    getProductsByUser(userId: ID!): [Product!]!

    getProductsByCategory(category: productCategory!): [Product!]!
        getOneStarFeedbacks: [Feedback!]!
    
    products(url: String!): [RecommendedProduct!]!
    getRecommendedProducts: [RecommendedProduct!]!
    getRecommendedProductsByCategory(category: recommendedproductCategory!): [RecommendedProduct!]!
    getFarmProducts: [Product!]!

    getAllPost: [Post!]!
    getpostById(id: ID!): Post!
    getPostsByUser(userId: ID!): [Post]!

    getAllComment(postId: ID!): [Comment!]!
    getCommentById(id: ID!): Comment!
    getCommentPerUser(userId:ID!):[Comment!]!

    getAllbadges:[Badge!]!

    getBadgeById(id:ID!):Badge!

    getOrder(id: ID!): Order
    getOrdersByUser(userId: ID!): [Order!]!
    getOrdersByFarmer(farmerId: ID!): [Order!]!
    getOrders: [Order!]!

    notifications: [Notification!]!
    getNotificationsByUser(userId:ID!):[Notification!]!

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
    addOrder(id: ID!,idorder: ID!): addOrderResponse
   
    deleteFeedback(id: ID!): Feedback
    createFeedback(input: FeedbackInput!): Feedback!
    createProduct(
      input: CreateProductInput!
      file: Upload
    ): createProductResponse!
    updateProduct(
      id: ID!
      input: UpdateProductInput!
      file: Upload
    ): createProductResponse!
    deleteProduct(id: ID!): Product!
    addReviewProduct(
      idProd: ID!
      idUser: ID!
      input: addReviewInput!
    ): addReviewResponse!

    addPost(input: postInput!, file: Upload): Post
    modifyPost(id: ID!, input: postInput!,file: Upload): Post
    deletePost(id: ID!): Post
    likePost(userId:ID!, postId:ID!):Post
    dislikePost(userId:ID!, postId:ID!):Post

    addComment(input: commentInput, postId: ID!, userId: ID!): Comment!
    modifyComment(id: ID!, input: commentInput!): Comment!
    deleteComment(id: ID!): Comment!

    assignBadges(userId:ID!):badgeResponse!

    createNotification(content: String!, type: NotificationType!, recipient: ID!): Notification!
    markNotificationAsRead(userId:ID!,id: ID!): Notification!
    deleteNotification(id: ID!): Notification!

    createOrder(input: CreateOrderInput!): createProductResponse!
    updateOrderDeliveryStatus(id: ID!, isDelivered: Boolean!): Order!
    updateOrderConfirmationStatus(id: ID!, isConfirmed: Boolean!): Order!
    deleteOrder(id: ID!): Order!
    add(input:eventInput):event
    createNotification(content: String!, type: NotificationType!, recipient: ID!): Notification!
    markNotificationAsRead(id: ID!): Notification!
    deleteNotification(id: ID!): Notification!
  }
  
  type event{
    id: ID!
    title: String
  description: String
  }
input eventInput{
  title: String
  description: String
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
    expirationDiscount: Boolean!
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
    expirationDiscount: Boolean!
  }
  input addReviewInput {
    rating: Int!
    comment: String!
  }
`;

module.exports = typeDefs;
