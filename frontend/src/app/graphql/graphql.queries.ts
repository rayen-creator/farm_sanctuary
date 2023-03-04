import { gql } from "apollo-angular";
const users = gql`
query{
getUsers{
    username,
    email
    }
    }
`;

export {users}
