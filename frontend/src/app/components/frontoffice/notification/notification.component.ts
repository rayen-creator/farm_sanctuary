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
  notificationCount: Number
    

  constructor(private notificationservice : NotificationService , private apollo : Apollo) { 
  }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationservice.getNotifications().subscribe((notifications) => {
      this.notificationCount = notifications?.filter(notification=> notification.seen === false).length;
      this.notifications = notifications
    });
    

  }


}
