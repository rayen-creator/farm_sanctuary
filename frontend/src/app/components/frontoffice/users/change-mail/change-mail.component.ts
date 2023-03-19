import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customvalidator} from "../../../../core/utils/custom-validator";
import {UserService} from "../../../../core/services/user.service";
import {AuthService} from "../../../../core/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-change-mail',
  templateUrl: './change-mail.component.html',
  styleUrls: ['./change-mail.component.css']
})
export class ChangeMailComponent implements OnInit {
  username: string;
  emailForm: FormGroup
  usernameSubs :Subscription;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private authservice: AuthService) { }

  ngOnInit(): void {
    this.usernameSubs=this.authservice.getUsername().subscribe({
      next :(username)=>{
        this.username=username;
      }
    })
    this.emailForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      }
      )
  }

  Valid(controlname: any, resetpwdForm: any) {
    return Customvalidator.Valid(controlname, resetpwdForm)
  }
  changeEmail(form:any){

    if (form.email !=""){
      this.userService.updateEmail(this.username, form.email);
    } else {
      Customvalidator.validateAllFormFields(this.emailForm);
    }
  }
}
