import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy  {
  username: string ;
  role:string ;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private usernameSubs : Subscription;
  private roleSubs :Subscription;
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
    this.usernameSubs=this.auth.getUsername().subscribe({
      next :(username)=>{
        this.username=username;
      },
      error :()=>{
        this.username="";
      }
    });

    this.roleSubs=this.auth.getRole().subscribe({
      next :(role)=>{
        this.role=role;
      },
      error :()=>{
        this.role=""
      }
    })
    console.log("username",this.username);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.username = this.auth.getUsername();
  //   this.role=this.auth.getRole();
  // }



  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.usernameSubs.unsubscribe();
    this.roleSubs.unsubscribe();
  }
  loggingout() {
    this.auth.logout();
  }
}
