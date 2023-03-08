import { Component, OnInit } from '@angular/core';
import {toggleBlock, users, deleteUser} from "../../../../core/graphql/graphql.queries.user";
import {Apollo} from "apollo-angular";
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
  filteredItems: User[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages: number;
  pages: number[];
  visibleUserList: User[];

  searchText = '';
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
    this.filteredItems = this.pagedItems;
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
            refetchQueries: [{
              query: users
            }]
          })
          .subscribe({
            next: (result: any) => {
              const updatedUser = result.data.toggleBlockUser as User;
              this.userList = this.userList.map((user) => {
                if (user.id === updatedUser.id) {
                  console.log(this.visibleUserList);
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


  deleteUser(id: String,index:number) {
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
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
            mutation: deleteUser,
            variables: { id },
            refetchQueries: [{
              query: users
            }]
          })
          .subscribe({
            next: (result: any) => {
              const deletedUser = result.data.deleteUser as User;


              // Update total pages based on new visibleUserList length
              this.totalPages = Math.ceil(this.visibleUserList.length / this.pageSize);
              this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

              // Adjust current page if necessary
              if (this.currentPage > this.totalPages) {
                this.currentPage = this.totalPages;
              }

              // Update filteredItems to display new visibleUserList
              const startIndex = (this.currentPage - 1) * this.pageSize;
              let endIndex = startIndex + this.pageSize;

              // Adjust end index if last page contains only admin users
              if (this.currentPage === this.totalPages && endIndex > this.visibleUserList.length) {
                endIndex = this.visibleUserList.length;
              }

              this.filteredItems = this.visibleUserList.slice(startIndex, endIndex);

              Swal.fire('Deleted', 'User has been deleted successfully.', 'success');



              // Remove deleted user from filteredItems array
              // this.filteredItems = this.filteredItems.filter((user) => user.id !== deletedUser.id);
            },
            error: (err) => {
              console.log('err :' + err);
            },
          });
      }
    });
  }



  onSearch(): void {
    const query = this.searchText.trim().toLowerCase();
    if (query) {
      this.filteredItems = this.visibleUserList.filter(user =>
        user.username.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
      );
    } else {
      this.filteredItems = this.pagedItems;
    }
  }
}
