import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createFeedback } from '../graphql/queries/graphql.queries'
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  isDesc: boolean = false;
  data: any;

  constructor(private appolo: Apollo, private router: Router) { }
  sortString(list: Feedback[], property: any) {
    this.data = list;
    this.isDesc = !this.isDesc;
    let direction = this.isDesc ? 1 : -1;
    this.data.sort(function (a: { [x: string]: number; }, b: { [x: string]: number; }) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;

      }
    });

  }

  createFeedback(feedback: Feedback) {
    const input = {
      title: feedback.title,
      subject: feedback.subject,
      content: feedback.content,
      rating: feedback.rating,
      category: feedback.category
    };
    return this.appolo.mutate({
      mutation: createFeedback,
      variables: {
        input: input
      }
    }).subscribe({
      next: (res) => {
        const createdFeed = res.data as Feedback;


      },
      error: (err) => {
        console.log(err);

      }
    });
  }

  
}