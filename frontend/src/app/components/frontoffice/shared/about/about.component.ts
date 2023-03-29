import { rating } from 'src/app/core/models/rating';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/core/models/feedback';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { ApolloQueryResult } from '@apollo/client/core';
import { getFeedbacksFiveStars } from 'src/app/core/graphql/queries/graphql.queries.feedback';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  feedbacks: Feedback[] = [];
  isDesc: boolean = false;
  
  


  constructor(private feedbackservice : FeedbackService , private apollo : Apollo) { }

  ngOnInit(): void {
    this.getFeedbacksFiveStars();
  }
  sort(property: any) {
    this.feedbackservice.sortString(this.feedbacks, property);
  }

  getFeedbacksFiveStars(): void {
    this.apollo
      .watchQuery<{ getFiveStarFeedbacks: Feedback[] }>({
        query: getFeedbacksFiveStars,
      })
      .valueChanges.subscribe({
        next: (result: ApolloQueryResult<{ getFiveStarFeedbacks: Feedback[] }>) => {
          this.feedbacks = result.data.getFiveStarFeedbacks.slice(0,2).map(feedback => ({
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

