import { gql } from "apollo-angular";
const deliveryAgents  = gql`
{
getdeliveryAgents{
    login,
    longitude,
    latitude,
    createdAt,
    updatedAt
    }
    }
`;

export {deliveryAgents}