import { roles } from './../models/role';
import { sendmailResponse } from './../graphql/graphqlResponse/sendmailResponse';
import { checkresettoken, sendmail } from '../graphql/queries/auth.queries';
import { LoginResponse } from '../graphql/graphqlResponse/loginResponse';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  login,
  resetpwd,
  SEND_OTP_MUTATION,
  VERIFY_OTP_MUTATION,
  signup,
} from '../graphql/queries/auth.queries';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { checkresettokenResponse } from '../graphql/graphqlResponse/checktokenResponse';
import {

  SendOTPMutationResponse,
  VerifyOTPResponse,
} from '../graphql/graphqlResponse/twoFactorAuthResponse';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // public username: string;
  public usernameExists: boolean;
  public emailExists: boolean;

  private tokenTimer: any;

  // Assure l'envoie d'un paramètre aux autres components
  //Un Subject est à la fois un observable ET un observateur.
  //On peut donc subscribe dessus, mais également lui envoyer des valeurs :
  private authStatusListener = new Subject<boolean>();
  private isUserAuthenticated = false;

  private usernameSubject = new BehaviorSubject<string>('');
  private roleSubject=new BehaviorSubject<string>('');
  // public username = this.usernameSubject.asObservable();

  responseMessage: any;
  public token: string;
  public role: string;

  constructor(
    private appolo: Apollo,
    private router: Router,
    private toastr: ToastrService
  ) { }

  login(user: User) {
    const input = {
      email: user.email,
      password: user.password,
    };

    return this.appolo
      .mutate({
        mutation: login,
        variables: {
          input: input,
        },
      })
      .subscribe({
        next: (res) => {
          //get the response
          const loginresponse = res.data as LoginResponse;

          // console.log("accessToken " + loginresponse.signin.accessToken);
          // console.log("username " + loginresponse.signin.username);
          // console.log('&&&&&&&&&&&&&&&&&' + this.isUserAuthenticated);
          const token = loginresponse.signin.accessToken;
          const username = loginresponse.signin.username;
          const IspassowrdValid = loginresponse.signin.passwordIsValid;
          const blockedByAdmin = loginresponse.signin.blocked;
          const userfound = loginresponse.signin.userfound;
          const role = loginresponse.signin.role;
          const two_FactAuth_Option=loginresponse.signin.two_FactAuth_Option;

          this.token = token;
          // this.role=role;

          if (!userfound) {
            console.log('userfound should be false ' + !userfound);

            this.toastr.error('User not found', 'Error', {
              progressBar: true,
              closeButton: true,
            });
            return;
          }
          if (!IspassowrdValid) {
            console.log('isvalidpwd should be false ' + !IspassowrdValid);
            this.toastr.error('password invalid please try again ', 'Error', {
              progressBar: true,
              closeButton: true,
            });
            return;
          }
          if (blockedByAdmin) {
            this.toastr.error(
              'you have been banned by the administrator of the app',
              'Ops !',
              {
                progressBar: true,
                closeButton: true,
              }
            );
            return;
          }

          if (token) {
            const expireInDuration = loginresponse.signin.expiresIn;
            this.isUserAuthenticated = true;
            //behaviour subject username
            this.usernameSubject.next(username);
            //behaviour subject role
            this.roleSubject.next(role);

            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expireInDuration * 1000
            );
            this.saveAuthData(token, username, expirationDate, role);
            if (two_FactAuth_Option){
              this.sendOTP(username);
              this.router.navigate(['/twofactorauth']);

            }else{
              this.toastr.success('Welcome back to your account', 'Logged In');
              this.router.navigate(['/home']);
            }
           
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  register(user: User) {
    const input = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      password: user.password,
      isActive: false,
      gender: user.gender,
      role: user.role,
    };

    return this.appolo.mutate({
      mutation: signup,
      variables: {
        input: input,
      },
    });
  }

  getToken() {
    return this.token;
  }

  getRole() {
    return this.roleSubject.asObservable();
  }
  getUsername() {
    return this.usernameSubject.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  isUserAuth() {
    return this.isUserAuthenticated;
  }

  //check if the link is valid
  isresettokenValid(email: string, resettoken: string) {
    const input = {
      token: resettoken,
      email: email,
    };
    this.appolo
      .mutate({
        mutation: checkresettoken,
        variables: {
          input: input,
        },
      })
      .subscribe({
        next: (res) => {
          const checkresettokenResponse = res.data as checkresettokenResponse;
          if (!checkresettokenResponse.checkresettoken.valid) {
            this.router.navigate(['/error']);
          }
        },
        error: (error) => {
          this.router.navigate(['/error']);
          throw error;
        },
      });
  }

  //send email with link to resetpwd
  sendmail(email: String) {
    const input = {
      email: email,
    };
    return this.appolo
      .mutate({
        mutation: sendmail,
        variables: {
          input: input,
        },
      })
      .subscribe({
        next: (res) => {
          const sendmailResponse = res.data as sendmailResponse;
          if (sendmailResponse.sendmail.mailstatus) {
            this.toastr.success('Mail sent !', 'Notification', {
              progressBar: true,
            });

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 4000);
          }
        },
        error: (error) => {
          throw error;
        },
      });
  }

  //update pwd
  resetpwd(email: String, password: String) {
    const input = {
      email: email,
      password: password,
    };
    return this.appolo
      .mutate({
        mutation: resetpwd,
        variables: {
          input: input,
        },
      })
      .subscribe({
        next: (res) => {
          this.toastr.success('Password updated !', 'Notification', {
            progressBar: true,
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          throw error;
        },
      });
  }

  autoAuthUser() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    if (!token || !expirationDate) {
      return;
    }
    const now = new Date();
    const expiresIn = new Date(expirationDate).getTime() - now.getTime();
    const currentDate = new Date();
    console.log('expirationDate', expirationDate);

    if (currentDate > new Date(expirationDate)) {
      this.logout();
      this.toastr.info('session expired', 'logging out', {
        progressBar: true,
      });
    }
    if (expiresIn) {
      this.token = token;
     
      this.isUserAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.usernameSubject.next(username ?? '');
      this.roleSubject.next(role ?? '');

      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.clearAuthData();
    this.isUserAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    console.log('Set Timer :', duration);

    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.removeItem('role');
    localStorage.clear();
  }

  private saveAuthData(
    token: string,
    username: string,
    expirationDate: Date,
    role: roles
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('role', role);
  }

  verifyOTP(username: string, otp: string) {
    const input = {
      username: username,
      otp: otp,
    };

    this.appolo
      .mutate({
        mutation: VERIFY_OTP_MUTATION,
        variables: {
          input: input,
        },
      })
      .subscribe({
        next: (rest) => {
          const response = rest.data as VerifyOTPResponse;
          const statusCode = response.verifyOTP.statusCode;
          console.log('response', response);

          console.log('statuscode', statusCode);
          if (statusCode) {
            this.toastr.success(
              'Two factor authentification complete welcomeback !',
              'success'
            );
            this.router.navigate(['/home']);

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

  sendOTP(username: string): void {
    const input = {
      username: username,
    };
    this.appolo
      .mutate({
        mutation: SEND_OTP_MUTATION,
        variables: {
          input: input,
        },
      })
      .subscribe({
        next: (rest) => {
          const response = rest.data as SendOTPMutationResponse;
          const statusCode = response.sendOTPVerificationEmail.statusCode;

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
}
