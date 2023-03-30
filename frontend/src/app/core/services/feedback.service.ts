import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from '../models/feedback';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { DecodedToken } from '../graphql/graphqlResponse/decodedToken';
import jwt_decode from "jwt-decode";
import { createFeedback, getFeedbackPerUser , feedbacks} from '../graphql/queries/graphql.queries.feedback';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  isDesc: boolean = false;
  data: any;
  private tokenSubs: Subscription;
  decodedToken: DecodedToken;
  userId: string;

  constructor(private apollo: Apollo, private router: Router, private auth: AuthService) {
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.decodedToken = jwt_decode(token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });
  }

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


  createFeedback(feedback: any) {

    console.log("userId", this.userId);
    const input = {
      title: feedback.title,
      subject: feedback.subject,
      content: feedback.content,
      rating: feedback.rating,
      category: feedback.category,
      user: this.userId
    };
    return this.apollo
      .mutate({
        mutation: createFeedback,
        variables: { input: input },
        refetchQueries: [{
          query: getFeedbackPerUser,
          variables: {userId:this.userId}
        }]
      })
      .subscribe({
        next: (result: any) => {
          const createFeedback = result.data.updateUser as Feedback;
          Swal.fire('Created', 'Feedback has been created successfully.', 'success');
          this.router.navigate(['/feedbacklist']);
        },
        error: (err) => {
          throw err;
        },
      });
  }

  getFeedbackPerUser() {
    const userId = this.userId;
    return this.apollo.watchQuery({
      query: getFeedbackPerUser,
      variables: { userId }
    }).valueChanges.pipe(
      map((res: any) => {
        const feedbacks = res.data.getFeedbackPerUser;
        return feedbacks as Feedback[];
      }))
  }

   getFeedbacks() {
    return this.apollo.watchQuery({
      query: feedbacks
    }).valueChanges;
  }






}

