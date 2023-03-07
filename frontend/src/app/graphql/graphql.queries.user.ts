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
  mutation updateUser($id: ID!) {
   updateUser(id:$id, input: {
    username: "johndoe222222",
    email: "johndoe22222@example.com",
    password: "password22212rrrr3",
    isActive: true,
    role: ADMIN,
     image: {
      url: "https://cdn-icons-png.flaticorgergergrgergergergergen.com/512/219/219986.png",
      contentType: "image/png"
    }
  }) {
    id
    username
    email
    isActive
    role
  }
}
`;
export {users, toggleBlock, deleteUser, user}
