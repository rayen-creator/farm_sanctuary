import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DecodedToken } from 'src/app/core/graphql/graphqlResponse/decodedToken';
import { AuthService } from 'src/app/core/services/auth.service';
import jwt_decode from "jwt-decode";
import {CartService} from "../../../../core/services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string;
  img: string;
  role: string;
  userIsAuthenticated = false;
  token: string;
  decodedToken: DecodedToken;
  userId: string;
  private authListenerSubs: Subscription;
  private usernameSubs: Subscription;
  private tokenSubs: Subscription;
  private imgSubs: Subscription;
  cartItemCount: number;
  constructor(private auth: AuthService,  private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItemCount = this.cartService.getItems().length;
    this.cartService.cartUpdated.subscribe(() => {
      this.cartItemCount = this.cartService.getItems().length;
    });
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
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.token = token
      this.decodedToken = jwt_decode(this.token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });

    this.usernameSubs = this.auth.getUsername().subscribe({
      next: (username) => {
        this.username = username;
      },
      error: () => {
        this.username = "";
      }
    });
    this.imgSubs = this.auth.getImg().subscribe({
      next: (img) => {
        this.img = img;
      },
      error: () => {
        this.img = "";
      }
    })

  }



  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.usernameSubs.unsubscribe();
    this.imgSubs.unsubscribe();
    this.tokenSubs.unsubscribe();
  }

  loggingout() {
    this.auth.logout();
  }
}
