import { feedbacks } from 'src/app/core/graphql/queries/graphql.queries.feedback';
import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { Feedback } from 'src/app/core/models/feedback';

@Component({
  selector: 'app-feedback-list-per-user',
  templateUrl: './feedback-list-per-user.component.html',
  styleUrls: ['./feedback-list-per-user.component.css']
})
export class FeedbackListPerUserComponent implements OnInit {

  feedbacks: Feedback[];
  rating:number=4;
  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.feedbackService.getFeedbackPerUser().subscribe({
      next: (res) => {
        this.feedbacks = res;
      },
      error: (err) => {
        throw err;
      }
    });

  }

}
