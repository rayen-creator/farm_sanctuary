import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy ,OnChanges {
  username: string ;
  role:string ;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.auth.isUserAuth();
    this.authListenerSubs = this.auth.getAuthStatusListener().subscribe({
      next :(isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        
      },
      error :()=>{
        this.userIsAuthenticated = false;
      }
    }
    );
    this.username = this.auth.getUsername();
    this.role=this.auth.getRole();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.username = this.auth.getUsername();
    this.role=this.auth.getRole();
  }



  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
  loggingout() {
    this.auth.logout();
  }
}
