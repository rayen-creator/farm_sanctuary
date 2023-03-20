import { Injectable } from '@angular/core';
import {
  SEND_OTP_MUTATION_SMS,
  updateEmail, user, users,
  VERIFY_EMAIL_CHANGE_OTP_MUTATION
} from "../graphql/queries/graphql.queries.user";
import {SendOTPMutationResponse, VerifyOTPResponse} from "../graphql/graphqlResponse/twoFactorAuthResponse";
import {Apollo} from "apollo-angular";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SendOTPMutationSmsResponse, verifyEmailChangeOTPResponse} from "../graphql/graphqlResponse/emailChangeResponse";
import jwt_decode from "jwt-decode";
import {DecodedToken} from "../graphql/graphqlResponse/decodedToken";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token:string;
  decodedToken :DecodedToken;
  userId:string;
  constructor( private appolo: Apollo,  private router: Router,
               private toastr: ToastrService, private auth: AuthService) { }

  verifyMailChangeOTP(username: string, otp: string) {
    const input = {
      username: username,
      otp: otp,
    };

    this.appolo
      .mutate({
        mutation: VERIFY_EMAIL_CHANGE_OTP_MUTATION,
        variables: {
          input: input,
        },
        refetchQueries: [{
          query: user
        }]
      })
      .subscribe({
        next: (rest) => {
          const response = rest.data as verifyEmailChangeOTPResponse;
          const statusCode = response.verifyEmailChangeOTP.statusCode;
          console.log('response', response);

          console.log('statuscode', statusCode);
          if (statusCode) {
            this.toastr.success(
              'success !',
              'success'
            );


          } else {
            this.toastr.error(
              'verification code incorrect or expired !',
              'Oops !'
            );
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }


  sendSMS(username: string): void {
    const input = {
      username: username,
    };
    this.appolo
      .mutate({
        mutation: SEND_OTP_MUTATION_SMS,
        variables: {
          input: input,
        },
      })
      .subscribe({
        next: (rest) => {
          const response = rest.data as SendOTPMutationSmsResponse;
          const statusCode = response.sendOTPVerificationSms.statusCode;

          if (statusCode) {
            this.toastr.success(
              'A verification code has been sent to your email ',
              'Verification code',
              {
                progressBar: true,
              }
            );

          } else {
            this.toastr.error(
              'Something is wrong please verify your email address',
              'Oops !',
              {
                progressBar: true,
              }
            );
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateEmail(username:String,email: String) {
    this.token=this.auth.getToken();
    this.decodedToken = jwt_decode(this.token) as DecodedToken;
    this.userId=this.decodedToken.id;
    const input = {
      username: username,
      email: email
    };
    return this.appolo
      .mutate({
        mutation: updateEmail,
        variables: {
          input: input,
        },
        refetchQueries: [{
      query: user
    }]
      })
      .subscribe({
        next: (res) => {
          this.toastr.success('Email updated !', 'Notification', {
            progressBar: true,
          });
          this.router.navigate(['/profile', this.userId]);
        },
        error: (error) => {
          throw error;
        },
      });
  }
}

