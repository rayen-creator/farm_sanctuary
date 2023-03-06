const { gql } = require('apollo-server-express');
const typeDefs = gql`

scalar DateTime

enum Role {
  FARMER
  CLIENT
  ADMIN
}


  enum Category {
    TECHNICAL
    NON_TECHNICAL
  }
  enum Rating {
    GOOD
    AVERAGE
    BAD
  }

  type Feedback {
    id: ID!
    title: String!
    subject: String!
    content: String!
    category:Category!
    rating:Rating!
  }


  input FeedbackInput {
    title: String!
    subject: String!
    content: String!
    rating: Rating!
    category: Category!
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


  type Query {
    getUser(id: ID!): User!
    getUsers: [User!]!
    
    getFeedback(id: ID!): Feedback!
    getFeedbacks: [Feedback!]!
  }

  type Mutation {
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): User!
    toggleBlockUser(id: ID!): User!

    createFeedback(input: FeedbackInput!): Feedback!
    updateFeedback(id: ID!, input: FeedbackInput!): Feedback!
    deleteFeedback(id: ID!): Feedback!
  }
`;

module.exports = typeDefs;