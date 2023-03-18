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
     gender,
    role,
     image
    two_FactAuth_Option
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
    gender,
    isBlocked,
    role,
     image ,
    two_FactAuth_Option
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
      image
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
      image
    }
  }
`;

const updateUser = gql`
  mutation updateUser($id:ID!,$input: UserInput!, $file: Upload!) {
  updateUser(id: $id,input: $input, file: $file) {
  id
   username
   phone
    gender
   email
    image
  }
}
`;
export { users, toggleBlock, deleteUser, user, updateUser }
