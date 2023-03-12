import { AbstractControl } from '@angular/forms';

import { Customvalidator } from './../../../core/utils/custom-validator';
import { Agent } from './../../../core/models/deliveryAgent';
import { Component, OnInit } from '@angular/core';
import {updatedeliveryAgent, createdeliveryAgent,getdeliveryAgent} from "../../../core/graphql/graphql.queries.agent";
import {Apollo, gql} from "apollo-angular";
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-delivery-agent-edit',
  templateUrl: './delivery-agent-edit.component.html',
  styleUrls: ['./delivery-agent-edit.component.css']
})
export class DeliveryAgentEditComponent implements OnInit {
  agent : Agent;
  
  newagent : Agent;
  isHidden: boolean ;
  AgentForm: FormGroup;
  pattern="^[ a-zA-Z0-9][a-zA-Z0-9 ]*$";
  pattern2="^[ a-zA-Z][a-zA-Z ]*$"
  action: string;
  id: number;
  mode:string;
  constructor(  private currentRoute: ActivatedRoute,
     private router: Router,private apollo: Apollo
    ) { }

  ngOnInit(): void {
    let id= this.currentRoute.snapshot.params['id'];
     
    if (id != null) {
        this.apollo
        .watchQuery({
          query: getdeliveryAgent,
          variables: { id },
        }).valueChanges.subscribe({
          next: (result: any) => {
            this.agent = result.data.getdeliveryAgent as Agent;
            this.update()
          },
          error: (err) => {
            console.log("err :" + err);
            console.log(this.agent);
          },
        });
        //update
        this.isHidden = false;
        this.action = "Update";
       
      }else{
        this.action = "Add";
        this.add()
        this.isHidden = true;
      }
    
    
    
  }
  private add() {
    this.AgentForm = new FormGroup({
      login: new FormControl("",[Validators.required,Validators.pattern(this.pattern),Validators.minLength(6)]),
      phone: new FormControl(null,[Validators.required, Validators.pattern(/^\d{8}$/)]),
      email: new FormControl("" , [Validators.required, Validators.email]),
      fullName: new FormControl("", [Validators.required,Validators.pattern(this.pattern2)]),
      password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmpassword:new FormControl ("", [Validators.required ])
    },
    this.passwordsShouldMatch
  );     
  }
 
   passwordsShouldMatch(fGroup: AbstractControl) {
    return this.AgentForm?.get('password')?.value === this.AgentForm?.get('confirmpassword')?.value
      ? null : {'mismatch': true};
  }
  private update() {
    
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
      password=e.password
      console.log(e)
    this.AgentForm = new FormGroup({
      'login': new FormControl(login,[Validators.required,Validators.pattern(this.pattern),Validators.minLength(6)]),
      'phone': new FormControl(phone, [Validators.required, Validators.pattern(/^\d{8}$/)]),
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'fullName': new FormControl(fullName, [Validators.required,Validators.pattern(this.pattern2)]),
      'password': new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      'confirmpassword':new FormControl ("", [Validators.required,Validators.min(3)])
      } ,
      this.passwordsShouldMatch
      );
     
      
     
      
  }



  onSubmit() {
    if(this.action == 'Update')
    {
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
          console.log(newagent);
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
                this.router.navigate(['admin/delvery'])
              },
              error: (err) => {
                console.log('err :' + err);
              },
            });
        }
      });
    }else{
      let newagent = this.AgentForm.value;
      const input = {
        login: newagent.login,
        password: newagent.password,
        fullName: newagent.fullName,
        email: newagent.email,
        phone: newagent.phone,
        //image :this.agent.image
      };
      console.log(input)
      this.apollo
      .mutate({
        mutation: createdeliveryAgent,
        variables: { input: input},
      })
      .subscribe({
        next: (result: any) => {
         // const updatedUser = result.data.updateUser as Agent;

          Swal.fire('Add', 'Agent has been added successfully.', 'success');
          this.router.navigate(['admin/delvery'])
          setTimeout(()=>{
            window.location.reload();
          }, 2000);
        },
        error: (err) => {
          console.log('err :' + err);
        },
      });

    }
    
  }
  

}
