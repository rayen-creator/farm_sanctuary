
import { Component, OnInit } from '@angular/core';
import {feedbacks} from "../../../../core/graphql/graphql.queries";
import {Apollo, gql} from "apollo-angular";
import {Feedback} from "../../../../core/models/feedback";
@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-form.html',
  styleUrls: ['./feedback-form.css']
})
export class FeedbackFormComponent implements OnInit {
  feedbackList: Feedback[];
    constructor(private apollo: Apollo) { }
  
    ngOnInit(): void {
      this.apollo
        .watchQuery({
          query: feedbacks
        }).valueChanges.subscribe({
        next: (data: any) => {
          this.feedbackList = data.data;
          console.log(this.feedbackList)
        },
        error: (err) => {
          console.log("err :" + err)
  
        }
      })
    }
  }
