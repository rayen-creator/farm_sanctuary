import { Component, OnInit } from '@angular/core';
import {users} from "../../../../graphql/graphql.queries.user";
import {Apollo, gql} from "apollo-angular";
import {User} from "../../../../core/models/user";
import {DatePipe} from "@angular/common";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [DatePipe]
})
export class UserListComponent implements OnInit {
userList: User[];
  constructor(private apollo: Apollo, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: users
      }).valueChanges.subscribe({
      next: (result: any) => {
        this.userList = result.data.getUsers as User[];
console.log(this.userList)
      },
      error: (err) => {
        console.log("err :" + err)

      }
    })
  }
}
