import { Component, OnInit } from '@angular/core';

import {Apollo, gql} from "apollo-angular";

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2'
import {User} from "../../../../core/models/user";
import {updateUser, user} from 'src/app/graphql/graphql.queries.user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user : User;
  userForm: FormGroup;
  pattern="^[ a-zA-Z0-9][a-zA-Z0-9 ]*$";
  constructor(  private currentRoute: ActivatedRoute,
                private router: Router,private apollo: Apollo
  ) { }

  ngOnInit(): void {
    let id= this.currentRoute.snapshot.params['id'];
    this.apollo
      .watchQuery({
        query: user,
        variables: { id },
      }).valueChanges.subscribe({
      next: (result: any) => {
        this.user = result.data.getUser as User;
        console.log(this.user,id)
        this.initForm()
      },
      error: (err) => {
        console.log("err :" + err);
        console.log(this.user);
      },
    });

  }

  private initForm() {

    let username: String = ""
    let email: String =""
    let phone =null


    const e = this.user
    username = e.username
    email = e.email
    phone = e.phone

    console.log(e)
    this.userForm = new FormGroup({
      'username': new FormControl(username, Validators.required),
      'phone': new FormControl(phone, Validators.required),
      'email': new FormControl(email, Validators.required)

    })
  }


  onSubmit() {
    Swal.fire({
      title: 'Are you sure you want to update your profile?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.isConfirmed) {
        let newUser = this.userForm.value;
        const input = {
          username: newUser.username,
          email: newUser.email,
          phone: newUser.phone,
          password: this.user.password,
          isActive: this.user.isActive,
          role: this.user.role
        };
        console.log(this.userForm)
        let id = this.currentRoute.snapshot.params['id'];

        this.apollo
          .mutate({
            mutation: updateUser,
            variables: {id, input: input},
          })
          .subscribe({
            next: (result: any) => {
              const updatedUser = result.data.updateUser as User;

              Swal.fire('Updated', 'User has been updated successfully.', 'success');

            },
            error: (err) => {
              console.log('err :' + err);
            },
          });
      }
    });
  }


}
