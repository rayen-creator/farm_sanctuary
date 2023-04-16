import { Component, OnDestroy, OnInit } from '@angular/core';
import * as bcrypt from 'bcryptjs'
import { Apollo } from "apollo-angular";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { User } from "../../../../core/models/user";
import { updateUser, user } from 'src/app/core/graphql/queries/graphql.queries.user';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserUpdateResponse } from "../../../../core/graphql/graphqlResponse/userUpdateResponse";
import { UserService } from "../../../../core/services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: User;
  userForm: FormGroup;
  usernameExist: Boolean
  imagePreview: string;
  pattern = "^[ a-zA-Z0-9][a-zA-Z0-9 ]*$";
  // TWO_FA :boolean;
  selectedFile: File;
  private mySubscription: Subscription;
  disabledP: boolean = true;
  country: string;


  constructor(private currentRoute: ActivatedRoute,
    private router: Router, private apollo: Apollo, private sanitizer: DomSanitizer, private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  ngOnInit(): void {
    let id = this.currentRoute.snapshot.params['id'];
    this.mySubscription = this.apollo
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

  matchPassword(formGroup: FormGroup) {
    const passwordControl = formGroup.get('newpassword');
    const confirmPasswordControl = formGroup.get('confirmNewPassword');

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ 'passwordMismatch': true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
    const currentPasswordControl = formGroup.get('currentpassword');
    const currentPassword = currentPasswordControl?.value;
    const hashedPassword = this.user.password; // Assuming that `this.user.password` contains the hashed password

    if (currentPassword) {
      const match = bcrypt.compareSync(currentPassword, hashedPassword);
      if (!match) {
        currentPasswordControl?.setErrors({ 'incorrectPassword': true });
      } else {
        currentPasswordControl?.setErrors(null);
      }
    }
  }

  handleFileInput(event: Event) {
    // @ts-ignore
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    console.log(this.selectedFile)
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
    // call your service method to update user image
  }
  onCell1CountryChange(event: any) {
    console.log(event.dialCode);
    console.log(event.name);
    return this.country = event.name;
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
        
        if (newUser.newpassword == '') {
          newUser.newpassword = this.user.password
        }
        const input = {
          username: newUser.username,
          email: newUser.email,
          phone: Number(newUser.phone) ,
          password: newUser.newpassword,
          isActive: this.user.isActive,
          gender: newUser.gender,
          role: this.user.role,
          two_FactAuth_Option: newUser.two_FactAuth_Option,
          image: this.selectedFile,
          location:this.country ?? 'Tunisia'
        };
        console.log("after edit", input)
        let id = this.currentRoute.snapshot.params['id'];


        this.apollo
          .mutate({
            mutation: updateUser,
            variables: { id, input: input, file: this.selectedFile },
            refetchQueries: [{
              query: user,
              variables: { id }
            }],
            context: {
              useMultipart: true
            }
          })
          .subscribe({
            next: (result: any) => {
              const userUpdateReponse = result.data as UserUpdateResponse;
              this.usernameExist = userUpdateReponse.updateUser.usernameExists;
              console.log(this.usernameExist)
              if (!this.usernameExist) {
                Swal.fire('Updated', 'User has been updated successfully.', 'success');
              }


            },
            error: (err) => {
              console.log('err :' + err);
            },
          });
      }
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

    this.userForm = this.formBuilder.group({
      username: [username, [Validators.required, Validators.pattern(this.pattern), Validators.minLength(3)]],
      email: [email, [Validators.required, Validators.email]],
      phone: [phone, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(15)]],
      gender: [gender, Validators.required],
      two_FactAuth_Option: [two_FactAuth_Option, Validators.required],
      currentpassword: [''],
      newpassword: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      confirmNewPassword: ['', [Validators.pattern(this.userForm?.get('newpassword')?.value)]]

    }
      , {
        validator: this.matchPassword.bind(this)
      })
  }


  sendSMS() {
    this.userService.sendSMS(this.user.username)
  }

  ngOnDestroy() {

    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

}
