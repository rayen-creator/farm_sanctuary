import { gql } from "apollo-angular";
const feedbacks = gql`
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
export {feedbacks}