import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { Customvalidator } from 'src/app/core/utils/custom-validator';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  loggedIn: any;
  loginform: FormGroup;
  isCameraOn: boolean;
  loading: boolean = false;

  constructor(private authservice: AuthService,
    private formBuilder: FormBuilder,
    private googleAuth: SocialAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.googleAuth.authState.subscribe({
      next: (user) => {
        this.user = user;
        this.loggedIn = (user != null);
        this.authservice.googleLogin(user);
        // console.log("user", user.photoUrl);
        // console.log("loggedIn", this.loggedIn);
      },
      error: (error) => {
        throw error;
      }
    })
    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  Valid(controlname: any, loginform: any) {
    return Customvalidator.Valid(controlname, loginform)

  }
  login(form: any) {
    if (form.email != "" && form.password != "") {
      this.authservice.login(form)

    } else {
      Customvalidator.validateAllFormFields(this.loginform);
    }
  }

  CameraOn() {
    this.isCameraOn = true;
  }
  CameraOff() {
    this.isCameraOn = false;
  }

  onGoogleSignInClicked() {
   
  }
}
