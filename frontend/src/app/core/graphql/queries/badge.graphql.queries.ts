import { gql } from "apollo-angular";

export const getAllbadges = gql`
 {
    getAllbadges {
    id
    image
    name
    description
    createdAt
  }
}
`;

export const assignBadges = gql`
mutation assignBadges($userId: ID!) {
  assignBadges(userId: $userId) {
    name
    image
    description
  }
}
`;

export const getBadgeById = gql`
query getBadgeById($id:ID!) {
  getBadgeById(id:$id) {
    id
    image
    name
    description
    createdAt
  }
} `;