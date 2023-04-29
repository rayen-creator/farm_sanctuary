import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_NOTIFICATIONS } from 'src/app/core/graphql/queries/notification.queries';
import { Notification } from 'src/app/core/models/notification';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ApolloQueryResult } from '@apollo/client/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications : Notification[]=[];  

  constructor(private notificationservice : NotificationService , private apollo : Apollo) { 
  }

  ngOnInit(): void {
    this.getNotifcations();
  }

  getNotifcations(): void {
    this.apollo
      .watchQuery<{ getNotifications: Notification[] }>({
        query: GET_NOTIFICATIONS,
      })
      .valueChanges.subscribe({
        next: (result: ApolloQueryResult<{ getNotifications: Notification[] }>) => {
          this.notifications = result.data.getNotifications.map(notification => ({
            ...notification,
          }));
        },
        error: (err) => console.log(err),
      });
  }


}
