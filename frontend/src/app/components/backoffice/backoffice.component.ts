import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class BackofficeComponent implements OnInit, OnDestroy {
  username: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private usernameSubs: Subscription;
  constructor(private auth: AuthService) { }


  ngOnInit(): void {
    this.userIsAuthenticated = this.auth.isUserAuth();
    this.authListenerSubs = this.auth.getAuthStatusListener().subscribe({
      next: (isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;

      },
      error: () => {
        this.userIsAuthenticated = false;
      }
    }
    );
    this.usernameSubs = this.auth.getUsername().subscribe({
      next: (username) => {
        this.username = username;
      },
      error: () => {
        this.username = "";
      }
    });
  }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.usernameSubs.unsubscribe();
  }
}
