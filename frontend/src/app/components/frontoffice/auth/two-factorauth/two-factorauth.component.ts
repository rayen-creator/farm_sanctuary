import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Customvalidator } from 'src/app/core/utils/custom-validator';

@Component({
  selector: 'app-two-factorauth',
  templateUrl: './two-factorauth.component.html',
  styleUrls: ['./two-factorauth.component.css']
})
export class TwoFactorauthComponent implements OnInit {
  username: string;
  verifyOTPForm: FormGroup
  verificationCode: string = '';

  constructor(private authservice: AuthService, private formBuilder: FormBuilder,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.verifyOTPForm = this.formBuilder.group({
      firstNumber: ['', Validators.required],
      secondNumber: ['', Validators.required],
      thirdNumber: ['', Validators.required],
      fourthNumber: ['', Validators.required]
    });
    this.username = this.authservice.getUsername();
  }

  Valid(controlname: any, verifyOTPForm: any) {
    return Customvalidator.Valid(controlname, verifyOTPForm)

  }

  onSubmit(form: any) {
    const { firstNumber, secondNumber, thirdNumber, fourthNumber } = form;
    const verificationCode = `${firstNumber}${secondNumber}${thirdNumber}${fourthNumber}`;
    
    console.log('Verification code:', form);
    console.log('Verification code:', verificationCode.toString());

    if (form.firstNumber != "" || form.secondNumber != "" || form.thirdNumber != "" || form.fourthNumber != "") {
      this.authservice.verifyOTP(this.username, verificationCode.toString());
    } else {
      this.toaster.error('please insert your code to continue !','Error',{
        progressBar :true
      })
      Customvalidator.validateAllFormFields(this.verifyOTPForm);

    }
  }
}
