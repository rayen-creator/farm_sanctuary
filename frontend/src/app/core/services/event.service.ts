import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { Event } from '../models/event';
import Swal from 'sweetalert2';
import { getEvents, createEvent, updateEvent } from '../graphql/queries/event.queries';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { getEvent } from '../graphql/queries/event.queries';
import { deleteEvent } from '../graphql/queries/event.queries';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private apollo: Apollo, private router: Router, private toastr: ToastrService,
    ) { }



  createEvent(event: Event){
  const input = {
    title: event.title,
    description: event.description,
    start: event.start,
    end: event.end,
    type: event.type,
  }
  return this.apollo.mutate({
    mutation:createEvent,
    variables:{
      input:input
    }, refetchQueries: [
      {
        query:getEvents,
      }   
    ]
  }).subscribe({
    next: (result: any) => {
      const createEvent = result.data.createEvent as Event;

    },
    error: (err) => {
      throw err;
    },

  })
}

getEvents(): Observable<Event[]> {
  // @ts-ignore
  return this.apollo
    .watchQuery({
      query: getEvents,
    }).valueChanges.pipe(
      // @ts-ignore
      map((res) => res.data.getEvents as Event[]),
      catchError((err) => {
        console.log(err);
        return of([]);
      })
    );
}

updateEvent(id: string, event: Event): Observable<Event> {
  const input = {
    title: event.title,
    description: event.description,
    start: event.start,
    end: event.end,
    type: event.type,
  };

  return this.apollo
  .mutate({
    mutation: updateEvent,
    variables: {
      id,
      input,
    },
    refetchQueries: [
      {
        query: getEvents,
      },
    ],
  })
  .pipe(
    map((result: any) => result.data.updateEvent as Event),
    catchError((err) => {
      console.error(err);
      throw err;
    })
  );

}


deleteEvent(id: string) {
  return this.apollo.mutate({
    mutation: deleteEvent,
    variables: {id},
    refetchQueries: [
      {
        query: getEvent
      }
    ]
  });
}



}
