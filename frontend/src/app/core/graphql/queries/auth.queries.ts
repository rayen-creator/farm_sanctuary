import { gql } from "apollo-angular";

export const login = gql`
mutation signin($input: signinInput!) {
  signin(input: $input) {
    accessToken
    username
    message
    expiresIn
    userfound
    passwordIsValid
    blocked
    role
  }
}
`;

export const sendmail = gql`
mutation sendmail($input: ForgetpwdInput!) {
  sendmail(input: $input) {
    message
    mailstatus
  }
}
`;

export const checkresettoken=gql`
mutation checkresettoken($input: checkresettoken!) {
  checkresettoken(input: $input) {
    valid
    message
  }
}
`;

export const resetpwd = gql`
mutation resetpwd($input: signinInput!) {
  resetpwd(input: $input) {
    message
    updateStatus
    userFound
  }
}
`;

export const VERIFY_OTP_MUTATION = gql`
  mutation VerifyOTP($email: String!, $otp: String!) {
    verifyOTP(input: { email: $email, otp: $otp }) {
      message  
      statusCode
      
    }
  }
`; 

export const SEND_OTP_MUTATION = gql`
  mutation SendOTPMutation($email: String!) {
    sendOTPVerificationEmail(input: { email: $email }) {
      message 
      statusCode
    }
  }
`;