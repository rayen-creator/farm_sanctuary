import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import ApexCharts from 'apexcharts';

import { Feedback } from 'src/app/core/models/feedback';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { deleteFeedback, feedbacks } from 'src/app/core/graphql/queries/graphql.queries.feedback';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbackList: Feedback[];
  public data:any;
  public listlength:number=0;
  public feedback:Feedback;
  public feedbacksToday : number=0; 
  public feedbacksRating1 :number=0; 
  public feedbacksRating5 : number=0; 
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private apollo: Apollo, private feedbackService: FeedbackService) { }

  ngOnInit(): void { 
    this.getFeedbacks().then((feedbackData) => {
      this.updateChart(feedbackData);
    });


  }


//pagination 
get totalPages(): number {
  return Math.ceil(this.feedbackList.length / this.itemsPerPage);
}

get startIndex(): number {
  return (this.currentPage - 1) * this.itemsPerPage;
}

get endIndex(): number {
  return this.startIndex + this.itemsPerPage ;
}

get isLastPage(): boolean {
  return this.currentPage === this.totalPages;
}

get isFirstPage(): boolean {
  return this.currentPage === 1;
}

paginate(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

get getPageRange() {
  const start = Math.max(1, this.currentPage - 2);
  const end = Math.min(this.totalPages, this.currentPage + 2);
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
}













// the list of feedbacks
getFeedbacks() {
  return new Promise<Feedback[]>((resolve, reject) => {
    this.apollo.watchQuery({
      query: feedbacks,
    }).valueChanges.subscribe({
      next: (result: any) => {
        this.feedbackList = result.data.getFeedbacks.map((feedback: Feedback) => {
          return {
            ...feedback,
            createdAt: new Date(feedback.createdAt),
          };
        });
        
        // Getting today's date
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
        //getting the feedback created today
        const feedbacksToday = this.feedbackList.filter((feedback) => {
          return feedback.createdAt >= todayStart && feedback.createdAt < todayEnd;
        });
        //getting the feedback rated 1 star

        const feedbacksRating1 = this.feedbackList.filter((feedback) => {
          return feedback.rating === 1; 
        });
        //getting the feedback rated 5 stars

        const feedbacksRating5 = this.feedbackList.filter((feedback) => {
          return feedback.rating === 5;
        });
        this.listlength = this.feedbackList.length;
        this.feedbacksToday = feedbacksToday.length;
        this.feedbacksRating1 = feedbacksRating1.length;
        this.feedbacksRating5 = feedbacksRating5.length;

        resolve(this.feedbackList);
      },
      error: (err) => {
        console.log("err :" + err);
        reject(err);
      },
    });
  });
}

// the data for the pie chart
  async getChartData(feedbackData: Feedback[]) {
    const ratings = [1, 2, 3, 4, 5];
    const ratingCounts = ratings.map((rating) => {
      return feedbackData.filter((feedback) => feedback.rating === rating).length;
    });

    const totalFeedbackCount = feedbackData.length;
    const ratingPercentages = ratingCounts.map((count) => {
      return (count / totalFeedbackCount) * 100;
    });

    return {
      labels: ratings,
      series: ratingPercentages,
    };
  }


// the chart data for the line data
  async getLineChartData(feedbackData: Feedback[]) {
    // Get unique dates
    const dates = [...new Set(feedbackData.map((feedback) => {
      if (feedback.createdAt instanceof Date) {
        return feedback.createdAt.toDateString();
      } else {
        console.error('createdAt is not an instance of Dat e1');
        return '';
      }
    }))];
  
    // Count feedbacks per date
    const feedbackCounts = dates.map((date) => {
      return feedbackData.filter((feedback) => {
        if (feedback.createdAt instanceof Date) {
          return feedback.createdAt.toDateString() === date;
        } else {
          console.error('createdAt is not an instance of Date');
          return false;
        }
      }).length;
    });
  
    return {
      labels: dates,
      series: [{ data: feedbackCounts }]
    };
  }
  
  

  async updateChart(feedbackData: Feedback[]) {
    const pieData = await this.getChartData(feedbackData);
    const lineData = await this.getLineChartData(feedbackData);
    
    // Create pie chart
    const pieChart = new ApexCharts(document.querySelector('#pie-chart'), {
      series: pieData.series,
      labels: pieData.labels.map((rating) => ` Rated: ${rating} `),
      chart: {
        type: 'pie',
        height: 350,
        title: {
          text: 'Feedback Ratings',
          align: 'center',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'gold'
          }
        }
      },
      colors: ['#73b4ff', '#298482', '#D9AA67', '#ff869a', '#BF55EC']
    });
    pieChart.render();
  
    // Create line chart
    const lineChart = new ApexCharts(document.querySelector('#line-chart'), {
      series: lineData.series,
      xaxis: {
        categories: lineData.labels
      },
      chart: {
        type: 'line',
        height: 350,
        title: {
          text: 'Feedbacks Created Per Day',
          align: 'center',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333'
          }
        }
      },
      colors: ['#298482']
    });
    lineChart.render();
  }
  
  //delete the feedback that is not useful 

  deleteFeedback(id: String) {
    Swal.fire({
      title: 'Are you sure you want to delete this feedback?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apollo
        .mutate({
          mutation: deleteFeedback,
          variables: { id: id },
          refetchQueries: [{
            query: feedbacks
          }]
        })
        .subscribe({
          next: (result: any) => {
            const deleteFeedback = result.data.deleteFeedback as Feedback;
            this.feedbackList = this.feedbackList.filter((feedback) => feedback.id != deleteFeedback.id);
      
            Swal.fire('Deleted', 'Feedback has been deleted successfully.', 'success');
          },
          error: (err) => {
            console.log('err :' + err);
          },
        });}
       
    });
  }
  
}
