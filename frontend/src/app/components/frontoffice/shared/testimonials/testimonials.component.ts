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
            ...feedback, starsHTML: this.getStarsArray(feedback.rating)
          }));
        },
        error: (err) => console.log(err),
      });
  }

  getStarsArray(rating: number): number[] {
    const starsArray = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starsArray.push(1);
      } else {
        starsArray.push(0);
      }
    }
    return starsArray;
  }  
    
  }

