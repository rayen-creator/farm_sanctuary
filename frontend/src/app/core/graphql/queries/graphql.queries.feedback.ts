import { gql } from "apollo-angular";
export const feedbacks = gql`
{
    getFeedbacks {
        category,
        content,
        id,
        rating,
        subject,
        title
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

