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
            username
            image
            location
         }
        comments{
            content
            createdAt
        }
  }
} `;

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
            username
            image
            location
         }
        comments{
            content
            createdAt
        }
  }
} `;

export const addPost = gql`
mutation addPost($input:postInput!) {
    addPost(input:$input) {
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
mutation modifyPost($id:ID!,$input:postInput!) {
    modifyPost(id:$id,input:$input) {
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
