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
    // @ts-ignore
    return this.appolo
      .watchQuery({
        query: GET_NOTIFICATIONS,
      }).valueChanges.pipe(
        // @ts-ignore
        map((res) => res.data.getNotifications as Notification[]),
        catchError((err) => {
          console.log(err);
          return of([]);
        })
      );
  }
}