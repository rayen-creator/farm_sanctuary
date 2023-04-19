import { gql } from "apollo-angular";

export const getAllPost = gql`
{
    getAllPost {
        id
        image
         title
        text
        likes
        topic
        createdAt
        updatedAt
        user{
            id
            username
            image
            location 
         }
        comments{
            content
           
        }
      
       
  }
} `;
export const getPostsByUser = gql`
query getPostsByUser($userId:ID!){
    getPostsByUser(userId:$userId){
        id
        image
         title
        text
        likes
        topic
        createdAt
        updatedAt
        user{
            id
            username
            image
            location
         }
         comments{
           content
        }
      }
}`;

export const getpostById = gql`
query getpostById($id:ID!) {
    getpostById(id:$id) {
        id
        image
         title
        text
        likes
        topic
        createdAt
        updatedAt
        user{
            id
            username
            image
            location
         }
        comments{
            content
        }
  }
} `;

export const addPost = gql`
mutation addPost($input:postInput!,$file: Upload) {
    addPost(input:$input,file: $file) {
        image
        title
        text
        likes
        topic
        createdAt
        updatedAt
  }
} `;

export const modifyPost = gql`
mutation modifyPost($id:ID!,$input:postInput!,$file: Upload) {
    modifyPost(id:$id,input:$input,file: $file) {
        image
        title
        text
        likes
        topic
        createdAt
        updatedAt
       
  }
} `;

export const deletePost = gql`
mutation deletePost($id:ID!) {
    deletePost(id:$id) {
        image
        title
        text
        likes
        topic
        createdAt
        updatedAt
      
  }
} `;

export const likePost = gql`
mutation likePost($userId:ID!, $postId:ID!) {
    likePost(userId:$userId,postId:$postId) {
        image
        title
        text
        likes
        topic
        createdAt
        updatedAt
      
  }
} `;
export const dislikePost = gql`
mutation dislikePost($userId:ID!, $postId:ID!) {
    dislikePost(userId:$userId,postId:$postId) {
        image
        title
        text
        likes
        topic
        createdAt
        updatedAt
      
  }
} `;
