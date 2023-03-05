import { gql } from "apollo-angular";
const users = gql`
{
getUsers{
    username,
    email,
    createdAt,
    updatedAt,
    isActive,
    isBlocked,
    role,
     image {
         url
      contentType
    }
    }
    }
`;

export {users}
