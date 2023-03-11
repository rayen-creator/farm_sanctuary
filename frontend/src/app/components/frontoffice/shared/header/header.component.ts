import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string | null;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.auth.isUserAuth();
    this.authListenerSubs = this.auth.getAuthStatusListener().subscribe(
      (isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      }
    )
    this.username = this.auth.getUsername();


  }


  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
  loggingout() {
    this.auth.logout();
  }
}
