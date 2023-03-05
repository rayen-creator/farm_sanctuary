import { Component, OnInit } from '@angular/core';
import {toggleBlock, users} from "../../../../graphql/graphql.queries.user";
import {Apollo, gql} from "apollo-angular";
import {User} from "../../../../core/models/user";
import {DatePipe} from "@angular/common";
import Swal from 'sweetalert2'
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
    this.loadUsers();
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

  loadUsers() {
    this.apollo
      .watchQuery({
        query: users,
      })
      .valueChanges.subscribe({
      next: (result: any) => {
        this.userList = result.data.getUsers as User[];
        console.log(this.userList);
        this.totalPages = Math.ceil(this.userList.length / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.setPage(1);
      },
      error: (err) => {
        console.log("err :" + err);
      },
    });
  }

  toggleBlockUser(id: String) {
    Swal.fire({
      title: 'Are you sure you want to block/unblock this user?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block/unblock',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apollo
          .mutate({
            mutation: toggleBlock,
            variables: { id },
          })
          .subscribe({
            next: (result: any) => {
              const updatedUser = result.data.toggleBlockUser as User;
              this.userList = this.userList.map((user) => {
                if (user.id === updatedUser.id) {
                  return updatedUser;
                }
                return user;
              });
              if (updatedUser.isBlocked) {
                Swal.fire('Blocked', 'User has been blocked successfully.', 'success');
              } else {
                Swal.fire('Unblocked', 'User has been unblocked successfully.', 'success');
              }
            },
            error: (err) => {
              console.log('err :' + err);
            },
          });
      }
    });
  }

}
