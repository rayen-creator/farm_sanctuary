import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../core/services/auth.service";
import { User } from "../../../../core/models/user";
import { Customvalidator } from "../../../../core/utils/custom-validator";
import { ActivatedRoute, Router } from "@angular/router";
import { SignupResponse } from "../../../../core/graphql/graphqlResponse/signupResponse";
import Swal from "sweetalert2";
import { Ng2TelInput } from 'ng2-tel-input';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  accountType: String

  pattern = "^[ a-zA-Z][a-zA-Z ]*$";
  usernameExist: Boolean
  emailExist: Boolean;
  country: string;

  constructor(private authservice: AuthService, private formBuilder: FormBuilder, private currentRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.accountType = this.currentRoute.snapshot.params['accountType'];
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this.pattern), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(15)]],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(this.registerForm?.get('password')?.value)]]

    }
      , {
        validator: this.matchPassword.bind(this)
      })
  }
  matchPassword(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ 'passwordMismatch': true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }

  onCell1CountryChange(event: any) {
    console.log(event.dialCode);
    console.log(event.name);
    return this.country = event.name;
  }


  register() {
    let newUser = this.registerForm.value;
    newUser.role = this.accountType
    newUser.location =this.country ?? 'Tunisia';
    console.log("country regsitred",this.country);
    if (newUser.username != "" && newUser.email != "" && newUser.password != "" && newUser.phone != "" && newUser.gender != "") {

      this.authservice.register(newUser).subscribe({
        next: (res) => {
          const registerReponse = res.data as SignupResponse;



          this.usernameExist = registerReponse.signup.usernameExists;
          this.emailExist = registerReponse.signup.emailExists;

          if (!this.usernameExist && !this.emailExist) {
            Swal.fire('Created', 'Account created successfully.', 'success');
            if (newUser.email != "" && newUser.password != "") {
              // this.authservice.login(newUser)
              this.router.navigate(['/login']);
              
            }
          }
        },
        error: (err) => {
          console.log(err);

        }
      });
    }
  }

}
