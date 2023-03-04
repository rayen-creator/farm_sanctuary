import { Component, OnInit } from '@angular/core';
import {users} from "../../../../graphql/graphql.queries";
import {Apollo, gql} from "apollo-angular";
import {User} from "../../../../core/models/user";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
userList: User[];
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: users
      }).valueChanges.subscribe({
      next: (data: any) => {
        this.userList = data.data;
console.log(this.userList)
      },
      error: (err) => {
        console.log("err :" + err)

      }
    })
  }
}
