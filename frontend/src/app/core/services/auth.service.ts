import { LoginResponse } from '../graphql/graphqlResponse/loginResponse';
import { Injectable } from '@angular/core';
import { Apollo, gql } from "apollo-angular";
import { Subject } from 'rxjs';
import { login } from "../graphql/auth.queries"
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;
  public username: string;
  public usernameExists: boolean;
  public emailExists: boolean;
  private tokenTimer: any;

  // Assure l'envoie d'un paramètre aux autres components
  //Un Subject est à la fois un observable ET un observateur. 
  //On peut donc subscribe dessus, mais également lui envoyer des valeurs :
  private authStatusListener = new Subject<boolean>();
  private isUserAuthenticated = false;

  constructor(private appolo: Apollo,private router:Router) { }


  getToken() {
    return this.token;
  }

  getUsername() {
    return localStorage.getItem('username')
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  isUserAuth() {
    return this.isUserAuthenticated;
  }
  
  login(user: User) {
    const input = {
      email: user.email,
      password: user.password
    };

    return this.appolo.mutate({
      mutation: login,
      variables: {
        input: input
      }
    }).subscribe({
      next: (res) => {
        const loginresponse=res.data as LoginResponse;

        console.log("accessToken "+loginresponse.signin.accessToken);
        console.log("username "+loginresponse.signin.username);

        const token = loginresponse.signin.accessToken;
        const username = loginresponse.signin.username;
      
        if (token) {
          const expireInDuration = loginresponse.signin.expiresIn;
          this.isUserAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expireInDuration * 1000);
          this.saveAuthData(token, username, expirationDate);
          // this.toastr.success('Welcome back to your account', 'Logged In')
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.log(err);

      }
    });
  }

  autoAuthUser() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    if (!token || !expirationDate) {
      return;
    }
    const now = new Date();
    const expiresIn = new Date(expirationDate).getTime() - now.getTime();

    console.log("expiresIn", expiresIn);

    if (expiresIn) {
      this.token = token;
      this.isUserAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.router.navigate(['/home']);
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
    localStorage.clear()
  }

  private saveAuthData(token: string, username: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }
}
