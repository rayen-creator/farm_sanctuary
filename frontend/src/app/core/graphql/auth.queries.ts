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
