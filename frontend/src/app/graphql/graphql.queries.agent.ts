import { gql } from "apollo-angular";
const Agents  = gql`
{ 
getdeliveryAgents{
    id,
    login,
    phone,
    email,
    longitude,
    latitude,
    createdAt,
    updatedAt,
    image {
         url
      contentType
    }
    }
    }
`;
const getdeliveryAgent  = gql`
  query getdeliveryAgent($id: ID!) 
{ 
  getdeliveryAgent(id: $id) {
    id,
    login,
    phone,
    email,
    longitude,
    latitude,
    createdAt,
    updatedAt,
    image {
         url
      contentType
    }
    }
    }
`;
const deletedeliveryAgent = gql`
  mutation deletedeliveryAgent($id: ID!) {
    deletedeliveryAgent(id: $id) {
      id
     login
     phone,
     email,
     longitude,
     latitude,
     createdAt,
     updatedAt,
      image {
        url
        contentType
      }
    }
  }
`;
export {Agents,deletedeliveryAgent}