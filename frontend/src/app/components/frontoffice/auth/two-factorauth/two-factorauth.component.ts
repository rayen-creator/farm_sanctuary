import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-two-factorauth',
  templateUrl: './two-factorauth.component.html',
  styleUrls: ['./two-factorauth.component.css']
})
export class TwoFactorauthComponent implements OnInit {
  email:string="nour.makdouli@gmail.com";
  verifyOTPForm = new FormGroup({
    firstNumber: new FormControl('', Validators.required),
    secondNumber: new FormControl('', Validators.required),
    thirdNumber: new FormControl('', Validators.required),
    fourthNumber: new FormControl('', Validators.required)
  });
  verificationCode: string = '';

  constructor( private authservice:AuthService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
   
  }
  

onSubmit(){
  const { firstNumber, secondNumber, thirdNumber, fourthNumber } = this.verifyOTPForm.value;
  this.verificationCode = `${firstNumber}${secondNumber}${thirdNumber}${fourthNumber}`;
  console.log('Verification code:', this.verificationCode); 
  this.authservice.verifyOTP(this.email,this.verificationCode);
  
}
}
