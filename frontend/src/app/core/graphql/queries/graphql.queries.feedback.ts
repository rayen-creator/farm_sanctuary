import { gql } from "apollo-angular";
export const feedbacks = gql`
{
    getFeedbacks {
        id
        title
        subject
        content
        rating
        category
        createdAt
        user{
            id 
            username 
        }
      }
    }
`;
export const createFeedback = gql`
    mutation createFeedback($input: FeedbackInput!){
    createFeedback(input:$input){
        title
        subject
        content
        rating
        category
        
    }
}
`;

export const getFeedbacksFiveStars = gql`
    query{
    getFiveStarFeedbacks{
        title,
        subject,
        content, 
        rating,
        category
    
    }
    }
    `;
export const getFeedbacksOneStar = gql`
query{
getOneStarFeedbacks{
    title,
    subject,
    content, 
    rating,
    category

}
}
`;


export const getFeedbackPerUser = gql`
query getFeedbackPerUser($userId:ID!){
      getFeedbackPerUser(userId:$userId){
        id
        title
        subject
        content
        rating
        category
        createdAt
      }
}`;
export const deleteFeedback = gql`
mutation deleteFeedback($id: ID!) {
  deleteFeedback(id: $id) {
    id
    title
    subject
    content
    rating
    category
    createdAt
  }
}
`;


