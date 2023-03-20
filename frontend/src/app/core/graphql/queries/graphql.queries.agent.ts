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
    image
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
    image
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
      image
    }
  }
`;
const updatedeliveryAgent = gql`
  mutation updatedeliveryAgent($id:ID!,$input:AgentInput!) {
    updatedeliveryAgent(id:$id,input:$input) {
       message
      emailExists
      loginExists


    }
  }
  `;
  const createdeliveryAgent = gql`
  mutation createdeliveryAgent($input:AgentInput!) {
    createdeliveryAgent(input:$input) {
      message
      emailExists
      loginExists


    }
  }
  `;
  const infomail = gql`
  mutation infomail($input: AgentInput!) {
    infomail(input: $input) {
      message

    }
  }
  `;
export {infomail ,createdeliveryAgent,getdeliveryAgent,Agents,deletedeliveryAgent,updatedeliveryAgent}
