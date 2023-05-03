import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  roleUser: Subscription;
  userRole: string;

  constructor(private auth: AuthService, private router: Router) {
    this.roleUser = this.auth.getRole().subscribe({
      next: (role) => {
        this.userRole = role;
      },
      error: (err) => {
        throw err;
      }
    });

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userRole) {
      // check if route is restricted by role
      if (route.data['roles'] && route.data['roles'].indexOf(this.userRole) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      // authorised so return true
      return true;
    }
    this.router.navigate(['/login']);
    return false;

  }

}
