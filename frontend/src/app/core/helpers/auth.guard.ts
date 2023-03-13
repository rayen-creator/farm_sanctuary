import { roles } from './../models/role';
import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = this.auth.getRole();

    // if (route.data['roles'] && route.data['roles'].indexOf(userRole) === -1) {
    //   // role not authorised so redirect to home page
    //   this.router.navigate(['/home']);
    //   return false;
    // }
    if (!userRole) {
      this.router.navigate(['/login']);
      return false;
    }
    // Check if the user has the required role
    if (route.data['roles'].includes(userRole)) {
      return true;
    }

    // If the user does not have the required role, redirect to the home page
    if (userRole === roles.ADMIN) {
      this.router.navigate(['/admin']);
    } else if (userRole === roles.FARMER) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/home']);
    }
    return true;


  }

}
