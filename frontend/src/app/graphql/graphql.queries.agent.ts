import { Agent } from './../core/models/deliveryAgent';
import { gql } from "apollo-angular";
const Agents  = gql`
{ 
 

getdeliveryAgents{
    id,
    login,
    phone,
    fullName,
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
    fullName,
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
     fullName,
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
const updatedeliveryAgent = gql`
  mutation updatedeliveryAgent($id:ID!,$input:AgentInput!) {
    updatedeliveryAgent(id:$id,input:$input) {
      login,
    password,
    fullName,
    email,
    phone,
    
    }
  }
  `;
export {getdeliveryAgent,Agents,deletedeliveryAgent,updatedeliveryAgent}