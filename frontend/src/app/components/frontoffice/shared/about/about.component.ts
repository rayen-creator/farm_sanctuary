import { rating } from 'src/app/core/models/rating';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/core/models/feedback';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { ApolloQueryResult } from '@apollo/client/core';
import { feedbacks } from 'src/app/core/graphql/queries/graphql.queries';

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
    this.getFeedbacks();
  }
  sort(property: any) {
    this.feedbackservice.sortString(this.feedbacks, property);
  }

  getFeedbacks() {
    this.apollo
      .watchQuery<{ getFeedbacks: Feedback[] }>({
        query: feedbacks,
      })
      .valueChanges.subscribe({
        next: (result: ApolloQueryResult<{ getFeedbacks: Feedback[] }>) => {
          this.feedbacks = result.data.getFeedbacks.filter((feedback) => feedback.rating === 5);
          this.feedbacks = this.feedbacks.slice(0, 2).map(feedback => ({
            ...feedback, starsHTML: this.getStarsHTML(feedback.rating)
          }));
        },
        error: (err) => console.log(err),
      });
  }
  
  
  getStarsHTML(rating: number): string {
    let starsHTML = '';
  
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
