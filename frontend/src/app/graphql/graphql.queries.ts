import { gql } from "apollo-angular";
const feedbacks = gql`
query{
    getFeedbacks{
    title,
    subject,
    content, 
    rating,
    category

    }
    }

`

;

export {feedbacks}