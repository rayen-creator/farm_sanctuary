import { gql } from "apollo-angular";

export const login = gql`
mutation signin($input: signinInput!) {
  signin(input: $input) {
    user{
      username
      role
      isBlocked
      two_FactAuth_Option
      image
      location
      
    }
    accessToken
    message
    expiresIn
    userfound
    passwordIsValid
  
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

export const sendmail = gql`
mutation sendmail($input: ForgetpwdInput!) {
  sendmail(input: $input) {
    message
    mailstatus
  }
}
`;

export const checkresettoken = gql`
mutation checkresettoken($input: checkresettoken!) {
  checkresettoken(input: $input) {
    valid
    message
  }
}
`;

export const resetpwd = gql`
mutation resetpwd($input: resetpwd!) {
  resetpwd(input: $input) {
    message
    updateStatus
    userFound
  }
}
`;

export const VERIFY_OTP_MUTATION = gql`
  mutation VerifyOTP($input:verifyOTPInput!) {
    verifyOTP(input: $input) {
      message  
      statusCode
      
    }
  }
`;

export const SEND_OTP_MUTATION = gql`
  mutation SendOTPMutation($input: twoFactorAuthInput!) {
    sendOTPVerificationEmail(input: $input) {
      message 
      statusCode
    }
  }
`;

