import {gql} from "apollo-angular";

const users = gql`
  {
    getUsers{
      id,
      username,
      email,
      phone,
      location,
      createdAt,
      updatedAt,
      isActive,
      isBlocked,
      gender,
      role,
      image
      two_FactAuth_Option,
      daily_tips_option,
      email_change_option
      badges{
        name
        image
      }
    }
  }
`;

const user = gql`
  query getUser($id: ID!)
  {
    getUser(id: $id) {
      id,
      username,
      email,
      password,
      phone,
      location,
      createdAt,
      updatedAt,
      isActive,
      gender,
      isBlocked,
      role,
      image ,
      two_FactAuth_Option,
      daily_tips_option,
      email_change_option,
      likedPost{
        id
      },
      badges{
        id
        name
        image
        description
      }
    }
  }
`;


const toggleBlock = gql`
  mutation toggleBlockUser($id: ID!){
    toggleBlockUser(id: $id) {
      id
      username
      email
      createdAt
      updatedAt
      isActive
      isBlocked
      role
      image
    }
  }
`;

const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      username
      email
      createdAt
      updatedAt
      isActive
      isBlocked
      role
      image
    }
  }
`;

const updateUser = gql`
  mutation updateUser($id:ID!,$input: UserInput!, $file: Upload) {
    updateUser(id: $id,input: $input, file: $file) {
      message,
      usernameExists
    }
  }
`;
export const VERIFY_EMAIL_CHANGE_OTP_MUTATION = gql`
  mutation VerifyEmailChangeOTP($input:verifyEmailChangeOTPInput!) {
    verifyEmailChangeOTP(input: $input) {
      message
      statusCode

    }
  }
`;

export const SEND_OTP_MUTATION_SMS = gql`
  mutation SendOTPMutationSms($input: emailChangeInput!) {
    sendOTPVerificationSms(input: $input) {
      message
      statusCode
    }
  }
`;

export const updateEmail = gql`
  mutation updateEmail($input: updateEmail!) {
    updateEmail(input: $input) {
      message
      updateStatus
      userFound
      emailExist
    }
  }
`;
export {users, toggleBlock, deleteUser, user, updateUser}
