import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { sendmail } from '../../../../core/graphql/queries/auth.queries';
import { Component, OnInit } from '@angular/core';
import { Customvalidator } from 'src/app/core/utils/custom-validator';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent implements OnInit {

  resetpwd: FormGroup

  constructor(private AuthService:AuthService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.resetpwd = this.formBuilder.group({
      email: ['', Validators.required],
    })
  }
  Valid(controlname: any, loginform: any) {
    return Customvalidator.Valid(controlname, loginform)

  }
  sendmail(form:any){
    console.log(form.email);
    if (form.email !=""){
    this.AuthService.sendmail(form.email)
  }  else {
    Customvalidator.validateAllFormFields(this.resetpwd);
  }
}
}
