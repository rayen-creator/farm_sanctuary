import { gql } from "apollo-angular";

export const getAllComment = gql`
query getAllComment($postId:ID!){
    getAllComment(postId:$postId) {
       id
       content
       createdAt
        user{
            id
            image
           username
         }
         post{
            id
         }
  }
} `;
export const getCommentPerUser = gql`
query getCommentPerUser($userId:ID!){
    getCommentPerUser(userId:$userId){
        id
       content
       createdAt
        user{
            id
        }
        post{
            id
        }
      }
}`;

export const getCommentById = gql`
query getCommentById($id:ID!) {
    getCommentById(id:$id) {
        id
       content
       createdAt
        user{
            username
        }
        post{
            id
        }
  }
} `;

export const addComment = gql`
mutation addComment($input:commentInput!,$postId: ID!,$userId:ID!) {
    addComment(input:$input,postId: $postId,userId:$userId) {
        id
        content
       createdAt
      
  }
} `;

export const modifyComment = gql`
mutation modifyComment($id:ID!,$input:commentInput!) {
    modifyComment(id:$id,input:$input) {
       content
       createdAt
  }
} `;

export const deleteComment = gql`
mutation deleteComment($id:ID!) {
    deleteComment(id:$id) {
        id
       content
       createdAt  
  }
} `;
