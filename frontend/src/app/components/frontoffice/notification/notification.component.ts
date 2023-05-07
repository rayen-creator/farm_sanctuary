import jwt_decode from "jwt-decode";
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_NOTIFICATIONS } from 'src/app/core/graphql/queries/notification.queries';
import { Notification } from 'src/app/core/models/notification';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ApolloQueryResult } from '@apollo/client/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { DecodedToken } from 'src/app/core/graphql/graphqlResponse/decodedToken';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications : Notification[]=[];
  notificationCount: Number;
  userId: string;
  private tokenSubs: Subscription;
  decodedToken: DecodedToken;

    

  constructor(private notificationservice : NotificationService , private auth: AuthService) { 
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.decodedToken = jwt_decode(token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });

  }

  ngOnInit(): void {
    this.notificationservice.getNotificationsByUser(this.userId).subscribe({
      next: (notifications: any) => {
        this.notifications = notifications;
      },
      error: (err) => {
        throw err;
      }
    })
  }

  
    

  }
