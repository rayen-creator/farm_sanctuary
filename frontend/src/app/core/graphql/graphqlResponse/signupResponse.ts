export interface SignupResponse {

  signup: {
    message: string;
    emailExists: Boolean;
    usernameExists: Boolean;
  }
}
