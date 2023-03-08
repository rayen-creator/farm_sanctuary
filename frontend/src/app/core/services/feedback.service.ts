import { Apollo , gql} from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createFeedback } from '../graphql/graphql.queries'
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private appolo: Apollo,private router:Router) { }

  createFeedback(feedback : Feedback){
    const input = {
      title : feedback.title,
      subject : feedback.subject,
      content : feedback.content,
      rating : feedback.rating,
      category : feedback.category
    };
    return this.appolo.mutate({
      mutation:createFeedback,
      variables: {
        input: input
      }
    }).subscribe({
      next: (res) => {
        const createdFeed=res.data as Feedback;

       
      },
      error: (err) => {
        console.log(err);

      }
    });
  }
    }


