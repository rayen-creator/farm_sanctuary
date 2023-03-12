import { Apollo } from 'apollo-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { users } from 'src/app/core/graphql/graphql.queries.user';
import { User } from 'src/app/core/models/user';
import { roles } from 'src/app/core/models/role';
import { genders } from 'src/app/core/models/gender';


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexOptions
  
} from "ng-apexcharts";
import { UserCount } from 'src/app/core/models/userCount';



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: "./dashboard-items.component.html",
  styleUrls: ['./dashboard-items.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userCountsByDate: UserCount[];


  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  userList: User[] = []
  numberOfAdmins : Number
  numberOfarmers : Number
  numberOfClients : Number
  numberOfMaleClients : Number
  numberOfFemaleFarmers : Number
  numberOfMaleFarmers : Number
  numberOfActiveUsers : Number
  numberOfNonActiveUsers : Number
  numberOfFemalClients : Number
  adminList : User[] =[]
  date: string;
  count: number;
  

  // ChartOptions:ApexOptions  = {
  //   series:[
  //     {
  //       name: "My-series",
  //       data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  //     }
  //   ],
  //   chart: {
  //     height: 350,
  //     type: "bar"
  //   },
  //   title : {
  //     text: "My First Angular Chart"
  //   },
  //   xaxis: {
  //     categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"],
  //     title: {
  //       text: "Month"
  //     }
  //   }
  // };
  constructor(private apollo : Apollo) {
   
  }
   


  ngOnInit(): void{
    
    this.UsersCount();
    this.UsersCountByCategory();
    this.UserCountByDate();
    
  }

  UserCountByDate(){
    this.apollo.watchQuery({
      query: users,
    }).valueChanges.subscribe((result: any) => {
      const userCountsByDate: { [date: string]: number } = {};
      for (const user of result.data.getUsers) {
        const date = user.createdAt.split('T')[0];
        userCountsByDate[date] = (userCountsByDate[date] || 0) + 1;
      }
      const userCountsByDateArray = [];
      for (const date in userCountsByDate) {
        if (userCountsByDate.hasOwnProperty(date)) {
          userCountsByDateArray.push({ date, count: userCountsByDate[date] });
        }
      }
      userCountsByDateArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.userCountsByDate = userCountsByDateArray;
    });
  }


  


  UsersCount(){
    this.apollo
      .watchQuery({
        query: users,
      })
      .valueChanges.subscribe({
      next: (result: any) => {
        this.userList = result.data.getUsers as User[];
        console.log(this.userList);
        
      },
      error: (err) => {
        console.log("err :" + err);
      },
    });
  }

  UsersCountByCategory(){
    this.apollo
      .watchQuery({
        query: users,
      })
      .valueChanges.subscribe({
      next: (result: any) => {
        this.adminList = result.data.getUsers.filter((user: User) => user.role === roles.ADMIN);
        this.numberOfAdmins = this.adminList.length;     
        this.adminList = result.data.getUsers.filter((user:User)=> user.role === roles.CLIENT && user.gender === genders.FEMALE )  
        this.numberOfFemalClients = this.adminList.length; 
        this.adminList = result.data.getUsers.filter((user: User) => user.role === roles.FARMER);
        this.numberOfarmers = this.adminList.length; 
        this.adminList = result.data.getUsers.filter((user:User)=> user.role === roles.CLIENT && user.gender === genders.MALE )  
        this.numberOfMaleClients = this.adminList.length; 
        this.adminList = result.data.getUsers.filter((user:User)=> user.role === roles.FARMER && user.gender === genders.FEMALE )  
        this.numberOfFemaleFarmers = this.adminList.length; 
        this.adminList = result.data.getUsers.filter((user:User)=> user.role === roles.FARMER && user.gender === genders.MALE )  
        this.numberOfMaleFarmers = this.adminList.length; 
        this.adminList = result.data.getUsers.filter((user: User) => user.isActive === true);
        this.numberOfActiveUsers = this.adminList.length;  
        this.adminList = result.data.getUsers.filter((user: User) => user.isActive === false);
        this.numberOfNonActiveUsers = this.adminList.length;  
        
        
        
        

          // this.adminList.filter(user => user.role === roles.FARMER);
          // this.numberOfarmers = this.adminList.filter.length;
          // this.adminList.filter(user => user.role === roles.CLIENT);
          // this.numberOfClients = this.adminList.filter.length;
          // this.adminList.filter(user => user.role === roles.CLIENT && user.gender === genders.MALE)
          // this.numberOfFemalClients = this.adminList.filter.length;
     
        console.log(this.numberOfAdmins);
        
      },
      error: (err) => {
        console.log("err :" + err);
      },
    });
  }


  
  }
