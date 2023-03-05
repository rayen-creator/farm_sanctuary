import { gql } from "apollo-angular";
const users = gql`
{
getUsers{
id,
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



const toggleBlock = gql`
  mutation toggleBlockUser($id: ID!){
    toggleBlockUser(id: $id) {
      id
      username
      email
      createdAt
      updatedAt
      isActive
      isBlocked
      role
      image {
        url
        contentType
      }
    }
  }
`;

const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      username
      email
      createdAt
      updatedAt
      isActive
      isBlocked
      role
      image {
        url
        contentType
      }
    }
  }
`;
export {users, toggleBlock, deleteUser}
