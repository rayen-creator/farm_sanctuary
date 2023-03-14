import { Apollo } from 'apollo-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { users } from 'src/app/core/graphql/queries/graphql.queries.user';
import { User } from 'src/app/core/models/user';
import { roles } from 'src/app/core/models/role';
import { genders } from 'src/app/core/models/gender';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexOptions,
} from 'ng-apexcharts';
import { UserCount } from 'src/app/core/graphql/queries/userCount';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard-items.component.html',
  styleUrls: ['./dashboard-items.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  userCountsByDate: UserCount[];

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptionss: Partial<ChartOptions> | any;
  public ChartOptions: Partial<ChartOptions> | any;


  adminList: User[] = [];
  userList: User[] = [];
  numberOfAdmins: Number;
  numberOfarmers: Number;
  numberOfClients: Number;
  numberOfMaleClients: Number;
  numberOfFemalClients: Number;
  numberOfFemaleFarmers: Number;
  numberOfMaleFarmers: Number;
  numberOfActiveUsers: Number;
  numberOfNonActiveUsers: Number;



  date: string;
  count: number;



  constructor(private apollo: Apollo) {

  }



  ngOnInit(): void {

    this.UsersCount();
    this.UsersCountByCategory();
    this.UserCountByDate();
    console.log(this.numberOfFemaleFarmers)
  }

  countAllUsers() {
    return this.userList.filter(user => user.role != roles.ADMIN).length;
  }
  getAllActiveUser(){
    return this.userList.filter(user =>
      user.role != roles.ADMIN && user.isActive
    ).length;
  }

  UserCountByDate() {
    this.apollo
      .watchQuery({
        query: users,
      })
      .valueChanges.subscribe((result: any) => {
        const userCountsByMonth: { [month: string]: number } = {};
        for (const user of result.data.getUsers) {
          const month = user.createdAt.split('T')[0].substring(0, 7);
          userCountsByMonth[month] = (userCountsByMonth[month] || 0) + 1;

          const userCountsByDateArray = [];
          for (const date in userCountsByMonth) {
            if (userCountsByMonth.hasOwnProperty(date)) {
              userCountsByDateArray.push({ date, count: userCountsByMonth[date] });
            }
          }
          userCountsByDateArray.sort(
            (a, b) => new Date(a.date + "-01").getMonth() - new Date(b.date + "-01").getMonth()
          );

          this.userCountsByDate = userCountsByDateArray;

        }



        const counts = this.userCountsByDate.map(item => item.count);
        const dates = this.userCountsByDate.map(item => item.date);
        this.chartOptionss = {
          series: [
            {
              name: "number of users created by date",
              data: counts

            }
          ],
          chart: {
            height: 350,
            type: "bar"
          },
          title: {
            text: "The number of users Created by Month",
            style: {
              fontSize: "20px",
              fontWeight: "bold",
              color: "green",
              fontFamily: "Arial, sans-serif",

              // Add any other styles you want to apply to the title here

            }
          },
          xaxis: {
            typ: 'datetime',
            categories: dates
          }

        };
      });
  }

  UsersCount() {
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
          console.log('err :' + err);
        },
      });
  }

  UsersCountByCategory() {
    this.apollo
      .watchQuery({
        query: users,
      })
      .valueChanges.subscribe({
        next: (result: any) => {
          this.adminList = result.data.getUsers.filter(
            (user: User) => user.role === roles.ADMIN
          );
          this.numberOfAdmins = this.adminList.length;
          this.adminList = result.data.getUsers.filter(
            (user: User) =>
              user.role === roles.CLIENT && user.gender === genders.FEMALE
          );
          this.numberOfFemalClients = this.adminList.length;
          this.adminList = result.data.getUsers.filter(
            (user: User) => user.role === roles.FARMER
          );
          this.numberOfarmers = this.adminList.length;
          this.adminList = result.data.getUsers.filter(
            (user: User) =>
              user.role === roles.CLIENT && user.gender === genders.MALE
          );
          this.numberOfMaleClients = this.adminList.length;
          this.adminList = result.data.getUsers.filter(
            (user: User) =>
              user.role === roles.FARMER && user.gender === genders.FEMALE
          );
          this.numberOfFemaleFarmers = this.adminList.length;
          this.adminList = result.data.getUsers.filter(
            (user: User) =>
              user.role === roles.FARMER && user.gender === genders.MALE
          );
          this.numberOfMaleFarmers = this.adminList.length;
          this.adminList = result.data.getUsers.filter(
            (user: User) => user.isActive === true
          );
          // this.numberOfActiveUsers = this.userList.filter(user =>
          //   user.role != roles.ADMIN && user.isActive
          // ).length;
          // console.log(this.numberOfActiveUsers)

          this.adminList = result.data.getUsers.filter(
            (user: User) => user.isActive === false
          );
          this.numberOfNonActiveUsers = this.adminList.length;


          this.adminList = result.data.getUsers.filter(
            (user: User) => user.role === roles.CLIENT
          );
          this.numberOfClients = this.adminList.length;



          this.chartOptions = {
            series: [this.numberOfMaleClients, this.numberOfFemalClients],
            chart: {
              width: 380,
              type: "pie"
            },
            title: {
              text: "Nomber of Client by gender",
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                color: "green",
                fontFamily: "Arial, sans-serif",

                // Add any other styles you want to apply to the title here

              }
            },
            labels: ["male clients", "female clients"],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };
          this.ChartOptions = {
            series: [this.numberOfMaleFarmers, this.numberOfFemaleFarmers],
            chart: {
              width: 380,
              type: "pie"
            },
            title: {
              text: "Nomber of Farmer by gender",
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                color: "green",
                fontFamily: "Arial, sans-serif",

                // Add any other styles you want to apply to the title here

              }
            },
            labels: ["male farmer", "female farmer"],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };

          // this.adminList.filter(user => user.role === roles.FARMER);
          // this.numberOfarmers = this.adminList.filter.length;
          // this.adminList.filter(user => user.role === roles.CLIENT);
          // this.numberOfClients = this.adminList.filter.length;
          // this.adminList.filter(user => user.role === roles.CLIENT && user.gender === genders.MALE)
          // this.numberOfFemalClients = this.adminList.filter.length;

        },
        error: (err) => {
          console.log('err :' + err);
        },
      });
  }
}
