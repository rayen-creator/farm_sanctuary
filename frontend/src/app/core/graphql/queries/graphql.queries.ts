import { gql } from "apollo-angular";


const feedbacks = gql
`

query{
    getFeedbacks{
    title,
    subject,
    content, 
    rating,
    category

    }
    }

`;

const createFeedback = gql `
    mutation createFeedback($input: FeedbackInput!){
    createFeedback(input:$input){
        title
        subject
        content
        rating
        category


    }
}
`

;

export {feedbacks , createFeedback}