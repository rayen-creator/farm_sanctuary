import { Component, OnInit } from '@angular/core';
import {updatedeliveryAgent, getdeliveryAgent} from "../../../../app/graphql/graphql.queries.agent";
import {Apollo, gql} from "apollo-angular";
import {Agent} from "../../../../app/core/models/deliveryAgent";
import { FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-delivery-agent-edit',
  templateUrl: './delivery-agent-edit.component.html',
  styleUrls: ['./delivery-agent-edit.component.css']
})
export class DeliveryAgentEditComponent implements OnInit {
  agent : Agent;
  AgentForm: FormGroup;
  pattern="^[ a-zA-Z0-9][a-zA-Z0-9 ]*$";
  action: string;
  constructor(  private currentRoute: ActivatedRoute,
     private router: Router,private apollo: Apollo
    ) { }

  ngOnInit(): void {
    let id= this.currentRoute.snapshot.params['id'];
    this.apollo
  .watchQuery({
    query: getdeliveryAgent,
    variables: { id },
  }).valueChanges.subscribe({
    next: (result: any) => {
      this.agent = result.data.getdeliveryAgent as Agent;
      console.log(this.agent,id)
      this.initForm()
    },
      error: (err) => {
        console.log("err :" + err);
        console.log(this.agent);
      },
    });
    
  }
   
  private initForm() {
    
    let fullName = ""
    let email =""
    let phone =null
    let login = ""
    let password = ""
   
     const e = this.agent
     fullName = e.fullName
      email = e.email
      phone = e.phone
      login = e.login
      console.log(e)
    this.AgentForm = new FormGroup({
      'login': new FormControl(login,[Validators.required,Validators.pattern(this.pattern)]),
      'phone': new FormControl(phone, Validators.required),
      'email': new FormControl(email, Validators.required),
      'fullName': new FormControl(fullName, Validators.required),
      'password': new FormControl(password, [Validators.required, Validators.min(3) ]),
      'confirmpassword':new FormControl (password, [Validators.required,Validators.min(3)])
      });
      let hide = true;
     
      
  }
 /// passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    //const password =this.AgentForm.value.password
//    const confirmPassword = this.AgentForm.value.confirmpassword

  //  if (password.value !== confirmPassword.value) {
    //  return { 'passwordMismatch': true };
//    }

  //  return null;
  //}


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
        let newagent = this.AgentForm.value;
        const input = {
          login: newagent.login,
          password: newagent.password,
          fullName: newagent.fullName,
          email: newagent.email,
          phone: newagent.phone,
          //image :this.agent.image
          
        };
        console.log(this.AgentForm)
        let id = this.currentRoute.snapshot.params['id'];

        this.apollo
          .mutate({
            mutation: updatedeliveryAgent,
            variables: {id, input: input},
          })
          .subscribe({
            next: (result: any) => {
             // const updatedUser = result.data.updateUser as Agent;

              Swal.fire('Updated', 'Agent has been updated successfully.', 'success');

            },
            error: (err) => {
              console.log('err :' + err);
            },
          });
      }
    });
  }
  

}
