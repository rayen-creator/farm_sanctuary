import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification } from '../models/notification';
import { GET_NOTIFICATIONS } from '../graphql/queries/notification.queries';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private apollo: Apollo) {}
        

        getNotifications(): Observable<Notification[]> {
          return this.apollo
            .watchQuery({
              query: GET_NOTIFICATIONS,
            }).valueChanges.pipe(
              map((res) => {
                // @ts-ignore
                const notifications = res.data.notifications as Notification[];
                console.log(notifications);
                return notifications;
              }),
              catchError((err) => {
                console.log(err);
                return of([]);
              })
            );
        }}