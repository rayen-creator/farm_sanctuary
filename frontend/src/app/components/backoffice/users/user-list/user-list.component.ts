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
  pagedItems: User[];
  pageSize = 5;
  currentPage = 1;
  totalPages: number;
  pages: number[];
  visibleUserList: User[];
  constructor(private apollo: Apollo, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: users
      }).valueChanges.subscribe({
      next: (result: any) => {
        this.userList = result.data.getUsers as User[];
        console.log(this.userList)
        this.totalPages = Math.ceil(this.userList.length / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.setPage(1);
      },
      error: (err) => {
        console.log("err :" + err)

      }
    })
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;

    // Filter out admin users from visible pages
    this.visibleUserList = this.userList.filter(u => u.role !== 'ADMIN');

    // Update total pages based on filtered user list
    this.totalPages = Math.ceil(this.visibleUserList.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    // Adjust end index if last page contains only admin users
    if (this.currentPage === this.totalPages && endIndex > this.visibleUserList.length) {
      endIndex = this.visibleUserList.length;
    }

    this.pagedItems = this.visibleUserList.slice(startIndex, endIndex);
  }



}
