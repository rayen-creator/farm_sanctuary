import { ContactComponent } from './../../../components/frontoffice/shared/contact/contact.component';
import { gql } from "apollo-angular";

export const getAllComment = gql`
query getAllComment($postId:ID!){
    getAllComment(postId:$postId) {
       id
       content
       createdAt
        user{
            image
           username
         }
  }
} `;
// export const getCommentsByUser = gql`
// query getCommentsByUser($userId:ID!){
//     getCommentsByUser(userId:$userId){
//         id
//        content
//        createdAt
//         user{
//             username
//         }
//         post{
//             id
//         }
//       }
// }`;

// export const getCommentById = gql`
// query getCommentById($id:ID!) {
//     getCommentById(id:$id) {
//         id
//        content
//        createdAt
//         user{
//             username
//         }
//         post{
//             id
//         }
//   }
// } `;

export const addComment = gql`
mutation addComment($input:commentInput!,$postId: ID!,$userId:ID!) {
    addComment(input:$input,postId: $postId,userId:$userId) {
        id
        content
       createdAt
      
  }
} `;

export const modifyComment = gql`
mutation modifyComment($id:ID!,$input:CommentInput!) {
    modifyComment(id:$id,input:$input) {
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

export const deleteComment = gql`
mutation deleteComment($id:ID!) {
    deleteComment(id:$id) {
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