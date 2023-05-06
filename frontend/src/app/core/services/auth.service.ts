import { roles } from './../models/role';
import { sendmailResponse } from './../graphql/graphqlResponse/sendmailResponse';
import { checkresettoken, sendmail } from '../graphql/queries/auth.queries';
import { LoginResponse } from '../graphql/graphqlResponse/loginResponse';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
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
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public usernameExists: boolean;
  public emailExists: boolean;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private isUserAuthenticated = false;
  private usernameSubject = new BehaviorSubject<string>('');
  private imgUser = new BehaviorSubject<string>('');
  private roleUser = new BehaviorSubject<string>('');
  responseMessage: any;
  public token = new BehaviorSubject<string>('');
  public role: roles;

  constructor(
    private appolo: Apollo,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
  ) { }

  loginFaceID(faceLogin: any) {
    return this.http.post(`${environment.flask}/recognize_face`, faceLogin).subscribe({

      next: (response: any) => {

        const isValid = response['valid'] as boolean;
        if (isValid) {
          const userObj = JSON.parse(response.user) as User; // parse user string into an object
          const username = userObj.username;
          const isActive = userObj.isActive;
          const isBlocked = userObj.isBlocked;
          const role = userObj.role;
          const image = userObj.image;
          const two_FactAuth_Option = userObj.two_FactAuth_Option;
          const token = response['token'];
          const expireIn = response['expireIn'];

          if (isBlocked) {
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
          this.token.next(token);
          this.usernameSubject.next(username);
          this.imgUser.next(image);
          this.roleUser.next(role);
          this.authStatusListener.next(true);

          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expireIn * 1000
          );

          if (two_FactAuth_Option) {
            this.sendOTP(username);
            this.saveAuthData(token, username, expirationDate, role, image);
            this.router.navigate(['/twofactorauth']);

          } else {
            this.saveAuthData(token, username, expirationDate, role, image);
            this.toastr.success('Welcome back to your account', 'Logged In');
            this.router.navigate(['/']);
          }


        } else {
          this.toastr.error("Face ID invalid", "login failed",
            {
              progressBar: true,
              closeButton: true,
            });
        }


      }, error: (err) => {
        throw err;
      }
    })

  }

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

          const IspassowrdValid = loginresponse.signin.passwordIsValid;
          const userfound = loginresponse.signin.userfound;

          if (!userfound) {

            this.toastr.error('User not found', 'Error', {
              progressBar: true,
              closeButton: true,
            });
            return;
          }
          if (!IspassowrdValid) {
            this.toastr.error('password invalid please try again ', 'Error', {
              progressBar: true,
              closeButton: true,
            });
            return;
          }
          const blockedByAdmin = loginresponse.signin.user.isBlocked;

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
          const token = loginresponse.signin.accessToken;
          const username = loginresponse.signin.user.username;
          const role = loginresponse.signin.user.role;
          const two_FactAuth_Option = loginresponse.signin.user.two_FactAuth_Option;
          const location = loginresponse.signin.user.location;
          const img = loginresponse.signin.user.image;
          this.token.next(token);
          if (token) {
            const expireInDuration = loginresponse.signin.expiresIn;
            this.isUserAuthenticated = true;

            this.usernameSubject.next(username);
            this.imgUser.next(img);
            this.roleUser.next(role);

            this.role = role;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expireInDuration * 1000
            );
            if (this.roleUser.value == roles.ADMIN) {
              this.saveAuthData(token, username, expirationDate, role, img);
              this.router.navigate(['/admin']);
              return;
            }
            if (two_FactAuth_Option) {
              this.sendOTP(username);
              this.saveAuthData(token, username, expirationDate, role, img);
              this.router.navigate(['/twofactorauth']);

            } else {
              this.saveAuthData(token, username, expirationDate, role, img);
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
    const phoneNumber = Number(user.phone)
    const input = {
      username: user.username,
      email: user.email,
      phone: phoneNumber,
      password: user.password,
      isActive: false,
      gender: user.gender,
      role: user.role,
      location: user.location,
      birthday: user.birthday,
      bio: user.bio
    };

    return this.appolo.mutate({
      mutation: signup,
      variables: {
        input: input,
      },
    });
  }

  getToken() {
    return this.token.asObservable();
  }

  getImg() {
    return this.imgUser.asObservable();
  }

  getRole() {
    return this.roleUser.asObservable();
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
  updateUserData(
    username: string,
  ) {
    localStorage.setItem('username', username);
    this.usernameSubject.next(username);
    // this.imgUser.next(img);
    // localStorage.setItem('img', img);
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
  resetpwd(email: String, password: String, token: string) {
    const input = {
      email: email,
      password: password,
      token: token
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
    const img = localStorage.getItem('img');
    if (!token || !expirationDate) {
      return;
    }
    const now = new Date();
    const expiresIn = new Date(expirationDate).getTime() - now.getTime();
    const currentDate = new Date();

    if (currentDate > new Date(expirationDate)) {
      this.logout();
      this.toastr.info('session expired', 'logging out', {
        progressBar: true,
      });
    }
    if (expiresIn) {
      this.token.next(token);

      this.isUserAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.usernameSubject.next(username ?? '');
      this.imgUser.next(img ?? '');
      this.roleUser.next(role ?? '');
      this.role = role as roles;
      this.authStatusListener.next(true);

      if (this.roleUser.value == roles.ADMIN) {
        console.log("roleUser", this.roleUser.value);
        console.log("auto login !");

        this.router.navigate(['/admin']);
      }
    }
  }

  logout() {
    this.clearAuthData();
    this.isUserAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {

    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private clearAuthData() {
    localStorage.clear();
  }

  private saveAuthData(
    token: string,
    username: string,
    expirationDate: Date,
    role: roles,
    img: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('role', role);
    localStorage.setItem('img', img);

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
