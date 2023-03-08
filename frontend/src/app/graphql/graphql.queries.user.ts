import { gql } from "apollo-angular";
const users = gql`
{
getUsers{
id,
    username,
    email,
    phone,
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

const user = gql`
query getUser($id: ID!)
{
  getUser(id: $id) {
    id,
    username,
    email,
    password,
    phone,
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

const updateUser = gql`
  mutation updateUser($id:ID!,$input: UserInput!) {
  updateUser(id: $id,input: $input) {
  id
   username
   phone
   email
  }
}
`;
export {users, toggleBlock, deleteUser, user, updateUser}
