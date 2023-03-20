import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { rating} from 'src/app/core/models/rating';

import { Feedback } from 'src/app/core/models/feedback';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { feedbacks } from 'src/app/core/graphql/queries/graphql.queries.feedback';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbackList: Feedback [];
  public data:any;
  public listlength:number=0;

  public order:boolean=false;
  public isDesc:boolean=false;
  public rating = rating;

  pagedItems: Feedback[];
  filteredItems: Feedback[] ;
  pageSize = 2;
  currentPage = 1;
  totalPages: number;
  pages: number[];

  searchText = '';





  constructor(private apollo: Apollo, private feedbackService: FeedbackService) { }

  ngOnInit(): void { 
    this.getFeedbacks();
    this.listlength=this.feedbackList.length;
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


  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;

 
    // Update total pages based on filtered user list
    this.totalPages = Math.ceil(this.feedbackList.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    // Adjust end index if last page contains only admin users
    if (this.currentPage === this.totalPages && endIndex > this.feedbackList.length) {
      endIndex = this.feedbackList.length;
    }

    this.pagedItems = this.feedbackList.slice(startIndex, endIndex);
    this.filteredItems = this.pagedItems;
  }


  onSearch(): void {
    const query = this.searchText.trim().toLowerCase();
    if (query) {
      this.filteredItems = this.feedbackList.filter(feedback =>
        feedback.title.toLowerCase().includes(query) || feedback.content.toLowerCase().includes(query) || feedback.subject.toLowerCase().includes(query)
      );
    } else {
      this.filteredItems = this.pagedItems;
    }
  }
  


}
