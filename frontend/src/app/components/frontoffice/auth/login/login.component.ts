import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { Customvalidator } from 'src/app/core/utils/custom-validator';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'angular-google';
  user:any;
  loggedIn:any;
  loginform: FormGroup
  constructor(private authservice:AuthService,private formBuilder: FormBuilder, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
    });
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
      console.log("Login form", form);

    } else {
      Customvalidator.validateAllFormFields(this.loginform);
    }
  }


}
