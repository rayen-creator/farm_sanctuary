import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Feedback } from 'src/app/core/models/feedback';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { feedbacks } from 'src/app/graphql/graphql.queries.feedback';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbackList: Feedback [];
  public data:any;
  public order:boolean=false;
  public isDesc:boolean=false;

  constructor(private apollo: Apollo, private feedbackService: FeedbackService) { }

  ngOnInit(): void { 
    this.getFeedbacks();
  }


  getFeedbacks(){
    this.apollo
    .watchQuery({
      query: feedbacks,
    })
    .valueChanges.subscribe({
    next: (result: any) => {
      this.feedbackList = result.data.getFeedbacks as Feedback[];
      console.log(this.feedbackList);

    },
    error: (err) => {
      console.log("err :" + err);
    },
  });
  }


  sortTitle(title:any)
  {this.feedbackService.sortString(this.feedbackList,title)}
  
  sortSubject(subject:any)
  {this.feedbackService.sortString(this.feedbackList,subject)}
  
  sortRating(rating:any)
  {this.feedbackService.sortString(this.feedbackList,rating)}
  
  sortCategory(title:any)
  {this.feedbackService.sortString(this.feedbackList,title)}
}
