import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Customvalidator } from 'src/app/core/utils/custom-validator';
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-two-fa',
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.css']
})
export class TwoFAComponent implements OnInit {
  username: string;
  verifyOTPForm: FormGroup;
  verificationCode: string = '';
  usernameSubs :Subscription;

  constructor(private authservice: AuthService,private userService: UserService, private formBuilder: FormBuilder,private toaster:ToastrService, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.verifyOTPForm = this.formBuilder.group({
      firstNumber: ['', Validators.required],
      secondNumber: ['', Validators.required],
      thirdNumber: ['', Validators.required],
      fourthNumber: ['', Validators.required]
    });
    // this.username = this.authservice.getUsername();
    this.usernameSubs=this.authservice.getUsername().subscribe({
      next :(username)=>{
        this.username=username;
      }
    })
  }

  Valid(controlname: any, verifyOTPForm: any) {
    return Customvalidator.Valid(controlname, verifyOTPForm)

  }

  onSubmit(form: any) {
    let id = this.currentRoute.snapshot.params['id'];
    const { firstNumber, secondNumber, thirdNumber, fourthNumber } = form;
    const verificationCode = `${firstNumber}${secondNumber}${thirdNumber}${fourthNumber}`;

    console.log('Verification code:', form);
    console.log('Verification code:', verificationCode.toString());

    if (form.firstNumber != "" || form.secondNumber != "" || form.thirdNumber != "" || form.fourthNumber != "") {
      if (id) {
        this.userService.verifyMailChangeOTP(this.username, verificationCode.toString());
      } else {
        this.authservice.verifyOTP(this.username, verificationCode.toString());
      }

    } else {
      this.toaster.error('please insert your code to continue !','Error',{
        progressBar :true
      })
      Customvalidator.validateAllFormFields(this.verifyOTPForm);

    }
  }

  resendMail(){
    let id = this.currentRoute.snapshot.params['id'];
    if (id){
      this.userService.sendSMS(this.username)
    } else {
      this.authservice.sendOTP(this.username);
    }

  }
}
