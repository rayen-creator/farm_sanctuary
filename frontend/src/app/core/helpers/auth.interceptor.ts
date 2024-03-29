import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler){

    // if (this.auth.isUserAuth()) {
      const authToken = this.auth.getToken();
      const modifiedRequest = request.clone({
        headers: request.headers.set(
          'Authorization' , `Bearer ${authToken}`
        )
      });
      return next.handle(modifiedRequest);
    // }
    // return next.handle(request);

  }
}
