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
const getAgentbyOrder  = gql`
  query getAgentbyOrder($id: ID!)
{
  getAgentbyOrder(id: $id) {
    
    fullName,
    
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
const getAvailableAgent  = gql`
  query getAvailableAgent
{
  getAvailableAgent {
    id

    }
    }
`;
const addOrder = gql`
mutation addOrder($id:ID!,$idorder:ID!) {
  addOrder(id:$id,idorder:$idorder) {
    message
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
export {getAgentbyOrder,getAvailableAgent,addOrder,infomail ,createdeliveryAgent,getdeliveryAgent,Agents,deletedeliveryAgent,updatedeliveryAgent}
