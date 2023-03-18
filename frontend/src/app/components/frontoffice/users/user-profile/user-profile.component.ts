import { Component, OnInit } from '@angular/core';

import { Apollo, gql } from "apollo-angular";

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { User } from "../../../../core/models/user";
import { updateUser, user } from 'src/app/core/graphql/queries/graphql.queries.user';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  pattern = "^[ a-zA-Z0-9][a-zA-Z0-9 ]*$";
  // TWO_FA :boolean;
  selectedFile: File;
  constructor(private currentRoute: ActivatedRoute,
    private router: Router, private apollo: Apollo,private sanitizer: DomSanitizer
  ) { }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  ngOnInit(): void {
    let id = this.currentRoute.snapshot.params['id'];
    this.apollo
      .watchQuery({
        query: user,
        variables: { id },
      }).valueChanges.subscribe({
        next: (result: any) => {
          this.user = result.data.getUser as User;
          console.log(result.data.getUser)
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
    let email: String = ""
    let phone = null
    let gender = ""
    let two_FactAuth_Option;

    const e = this.user
    username = e.username
    email = e.email
    phone = e.phone
    gender = e.gender
    two_FactAuth_Option = e.two_FactAuth_Option

    console.log(e)
    this.userForm = new FormGroup({
      'username': new FormControl(username, Validators.required),
      'phone': new FormControl(phone, Validators.required),
      'email': new FormControl(email, Validators.required),
      'gender': new FormControl(gender, Validators.required),
      'two_FactAuth_Option': new FormControl(two_FactAuth_Option, Validators.required)
    })
  }

  handleFileInput(event: Event) {
    // @ts-ignore
    this.selectedFile = (event.target as HTMLInputElement).files[0];
console.log(this.selectedFile)
    // call your service method to update user image
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
          gender: newUser.gender,
          role: this.user.role,
          two_FactAuth_Option:newUser.two_FactAuth_Option,
          image:this.selectedFile
        };
        console.log("after edit",this.userForm)
        let id = this.currentRoute.snapshot.params['id'];


        this.apollo
          .mutate({
            mutation: updateUser,
            variables: { id, input: input, file:this.selectedFile},
            context: {
          useMultipart: true
        }
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
