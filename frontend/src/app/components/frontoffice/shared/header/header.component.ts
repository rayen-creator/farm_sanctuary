import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DecodedToken } from 'src/app/core/graphql/graphqlResponse/decodedToken';
import { AuthService } from 'src/app/core/services/auth.service';
import jwt_decode from "jwt-decode";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string;
  img:string;
  role: string;
  userIsAuthenticated = false;
  token:string;
  decodedToken :DecodedToken;
  userId:string;
  private authListenerSubs: Subscription;
  private usernameSubs: Subscription;
  private imgSubs: Subscription;
  constructor(private auth: AuthService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.token=this.auth.getToken();
    this.decodedToken = jwt_decode(this.token) as DecodedToken;
    this.userId=this.decodedToken.id;

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
    this.imgSubs=this.auth.getImg().subscribe({
      next :(img)=>{
        this.img=img;
      },
      error: () => {
        this.img = "";
      }
    })

  }

 
  // sanitizeImageUrl(imageUrl: string): SafeUrl {
  //   return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  // }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.usernameSubs.unsubscribe();
    // this.roleSubs.unsubscribe();
  }
  loggingout() {
    this.auth.logout();
  }
}
