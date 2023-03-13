import { gql } from "apollo-angular";

export const login = gql`
mutation signin($input: signinInput!) {
  signin(input: $input) {
    accessToken
    username
    message
    expiresIn
  }
}
`;

export const signup = gql`
  mutation signup($input: UserInput!) {
    signup(input: $input) {
    message,
  emailExists,
  usernameExists
    }
  }
`;
