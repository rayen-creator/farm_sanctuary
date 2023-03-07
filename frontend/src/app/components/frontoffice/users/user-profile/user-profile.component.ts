import { Component, OnInit } from '@angular/core';

import {Apollo, gql} from "apollo-angular";

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2'
import {User} from "../../../../core/models/user";
import { user } from 'src/app/graphql/graphql.queries.user';

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

      'phone': new FormControl(phone, Validators.required),
      'email': new FormControl(email, Validators.required),
      'username': new FormControl(username, Validators.required),
    })
  }


  onSubmit() {
    // console.log(this.AgentForm )
    // let id= this.currentRoute.snapshot.params['id'];
    // let newAgznt =this.AgentForm
    // this.apollo
    //   .mutate({
    //     mutation: updatedeliveryAgent,
    //     variables: {id ,newAgznt },
    //   })
    //   .subscribe({
    //     next: (result: any) => {
    //       const updatedeliveryAgent = result.data.updatedeliveryAgent as Agent;
    //
    //       Swal.fire('Updated', 'Agent has been Updated successfully.', 'success');
    //       this.router.navigate(['/admin/delvery'])
    //     },
    //     error: (err) => {
    //       console.log('err :' + err);
    //     },
    //   });

  }



}
