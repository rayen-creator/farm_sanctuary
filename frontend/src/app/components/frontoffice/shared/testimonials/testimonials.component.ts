import { feedbacks } from 'src/app/core/graphql/queries/graphql.queries';
import { Feedback } from './../../../../core/models/feedback';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  feedbacks : Feedback[]=[];  

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks(): void {
    this.apollo
      .watchQuery<{ getFeedbacks: Feedback[] }>({
        query: feedbacks,
      })
      .valueChanges.subscribe({
        next: (result: ApolloQueryResult<{ getFeedbacks: Feedback[] }>) => {
          this.feedbacks = result.data.getFeedbacks.map(feedback => ({
            ...feedback, starsHTML: this.getStarsHTML(feedback)
          }));
        },
        error: (err) => console.log(err),
      });
  }

  getStarsHTML(feedback: Feedback): string {
    let starsHTML = '';
    const rating = feedback.rating;
  
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starsHTML += '<span class="fa fa-star checked"></span>';
      } else {
        starsHTML += '<span class="fa fa-star"></span>';
      }
    }
  
    return starsHTML;
  }
}
