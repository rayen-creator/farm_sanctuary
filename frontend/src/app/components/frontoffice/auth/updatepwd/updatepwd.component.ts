import { AuthService } from 'src/app/core/services/auth.service';
import { DecodedToken } from '../../../../core/graphql/graphqlResponse/decodedToken';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import jwt_decode from "jwt-decode";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customvalidator } from 'src/app/core/utils/custom-validator';

@Component({
  selector: 'app-updatepwd',
  templateUrl: './updatepwd.component.html',
  styleUrls: ['./updatepwd.component.css']
})
export class UpdatepwdComponent implements OnInit {
  resetpwdForm: FormGroup;
  decodedToken :DecodedToken;
  constructor(private router: ActivatedRoute, private AuthService: AuthService,private formbuilder:FormBuilder) { }
 
  ngOnInit(): void {
    const resetpwdToken = this.router.snapshot.params['token'];
     this.decodedToken = jwt_decode(resetpwdToken) as DecodedToken;

    this.AuthService.isresettokenValid(this.decodedToken.user_email, resetpwdToken);
    this.resetpwdForm=this.formbuilder.group({
      password: ['', Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        Customvalidator.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        Customvalidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        Customvalidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. check whether the entered password has a special character
        Customvalidator.patternValidator(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, { hasSpecialCharacters: true }),
        Validators.minLength(8)])
      ],
      confirmpassword: ['', Validators.required],

    });
    
  }

  Valid(controlname: any, resetpwdForm: any) {
    return Customvalidator.Valid(controlname, resetpwdForm)
  }

  resetpwd(form:any){

    if (form.password !=""){
      this.AuthService.resetpwd(this.decodedToken.user_email,form.password);
    }else {
      Customvalidator.validateAllFormFields(this.resetpwdForm);
    }
  }

}
