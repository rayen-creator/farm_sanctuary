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

export const VERIFY_OTP_MUTATION = gql`
  mutation VerifyOTP($email: String!, $otp: String!) {
    verifyOTP(input: { email: $email, otp: $otp }) {
      message
    }
  }
`; 

export const SEND_OTP_MUTATION = gql`
  mutation SendOTPMutation($email: String!) {
    sendOTPVerificationEmail(input: { email: $email }) {
      message
    }
  }
`;




