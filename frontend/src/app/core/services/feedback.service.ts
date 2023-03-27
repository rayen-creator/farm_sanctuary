import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createFeedback } from '../graphql/queries/graphql.queries'
import { Feedback } from '../models/feedback';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  isDesc: boolean = false;
  data: any;

  constructor(private apollo: Apollo, private router: Router) { }

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

  private assignUserToFeedback(){
    
  }
  createFeedback(feedback: Feedback) {
    const input = {
      title: feedback.title,
      subject: feedback.subject,
      content: feedback.content,
      rating: feedback.rating,
      category: feedback.category
    };
    return this.apollo
      .mutate({
        mutation: createFeedback,
        variables: { input: input },
      })
      .subscribe({
        next: (result: any) => {
          const createFeedback = result.data.updateUser as Feedback;
          Swal.fire('Created', 'Feedback has been created successfully.', 'success');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          throw err;
        },
      });
  }

}