import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/core/graphql/graphql.queries.user';
import { User } from 'src/app/core/models/user';
import { roles } from 'src/app/core/models/role';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard-items.component.html',
  styleUrls: ['./dashboard-items.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userList: User[] = []
  numberOfAdmins : Number
  numberOfarmers : Number
  numberOfClients : Number
  farmerList: User[] =[]
  clientList: User[] =[]
  adminList : User[] =[]
  constructor(private apollo : Apollo) { }

  ngOnInit(): void{
    
    this.UsersCount();
    this.UsersCountByCategory();

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
        //this.adminList.filter(user => user.role === roles.ADMIN)
        // this.clientList.filter(user => user.role === roles.CLIENT)
        // this.farmerList.filter(user => user.role === roles.FARMER)
        this.adminList = result.data.getUsers as User[];
          this.adminList.filter(user => user.role === roles.ADMIN);
          this.numberOfAdmins = this.adminList.filter.length;
          this.adminList.filter(user => user.role === roles.FARMER);
          this.numberOfarmers = this.adminList.filter.length;
          this.adminList.filter(user => user.role === roles.FARMER);
          this.numberOfClients = this.adminList.filter.length;
     
        console.log(this.numberOfAdmins);
        
      },
      error: (err) => {
        console.log("err :" + err);
      },
    });
  }


  
  }
