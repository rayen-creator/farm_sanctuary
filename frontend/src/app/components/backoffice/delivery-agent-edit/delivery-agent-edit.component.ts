import { DriverResponse } from './../../../core/graphql/graphqlResponse/driverloginResponse';
import { updateDriverResponse } from './../../../core/graphql/graphqlResponse/updatedriverResponse';
import {Customvalidator} from "../../../core/utils/custom-validator"
import { Agent } from './../../../core/models/deliveryAgent';
import { Component, OnInit } from '@angular/core';
import {Agents ,infomail,updatedeliveryAgent, createdeliveryAgent,getdeliveryAgent} from "../../../core/graphql/graphql.queries.agent";
import {Apollo, gql} from "apollo-angular";
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
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
  loginExist: Boolean 
  emailExist: Boolean
  constructor(  private currentRoute: ActivatedRoute,
     private router: Router,private apollo: Apollo,
     private formBuilder: FormBuilder
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
    this.AgentForm = this.formBuilder.group({
      login:[ "",[Validators.required,Validators.pattern(this.pattern),Validators.minLength(6)]],
      phone: [null,[Validators.required, Validators.pattern(/^\d{8}$/)]],
      email: ["" , [Validators.required, Validators.email]],
      fullName:[ "", [Validators.required,Validators.pattern(this.pattern2)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmpassword:["", [Validators.required, Validators.pattern(this.AgentForm?.get('password')?.value)]]
    }, 
     {
      validator: this.matchPassword.bind(this)
     } 
      )
  }
  
 
  matchPassword(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmpassword');

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ 'passwordMismatch': true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
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
      this.AgentForm = this.formBuilder.group({
        login:[ login,[Validators.required,Validators.pattern(this.pattern),Validators.minLength(6)]],
        phone: [phone,[Validators.required, Validators.pattern(/^\d{8}$/)]],
        email: [email , [Validators.required, Validators.email]],
        fullName:[ fullName, [Validators.required,Validators.pattern(this.pattern2)]],
        password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        confirmpassword:["", [Validators.required, Validators.pattern(this.AgentForm?.get('password')?.value)]]
      }, 
       {
        validator: this.matchPassword.bind(this)
       } 
        )
    }
    
     
      
     
      
  



  onSubmit() {
    let newagent = this.AgentForm.value;
    
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
              refetchQueries: [{
                query: Agents
              }]
            })
            .subscribe({
              next: (result: any) => {
               // const updatedUser = result.data.updateUser as Agent;
               const registerReponse=result.data as  updateDriverResponse;
               console.log(registerReponse.updatedeliveryAgent.emailExists);
               console.log(registerReponse.updatedeliveryAgent.loginExists);
               this.loginExist = registerReponse.updatedeliveryAgent.loginExists;
               this.emailExist  = registerReponse.updatedeliveryAgent.emailExists;
               if (!this.loginExist && !this.emailExist){
                Swal.fire('Updated', 'Agent has been updated successfully.', 'success');
                this.router.navigate(['admin/delvery'])}
                this.apollo
                .mutate({
                  mutation: infomail,
                  variables: { input: input},
                  
                })
                .subscribe({
                  next: (result: any) => {
                  // const updatedUser = result.data.updateUser as Agent
                  //this.router.navigate(['admin/delvery'])
          //setTimeout(()=>{
            //window.location.reload();
         // }, 2000);
                  },
                  error: (err) => {
                    console.log('err :' + err);
                  },
                });
    
              },
              error: (err) => {
                console.log('err :' + err);
              },
            });
           
        }
      });
      
    }else{
      
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
        refetchQueries: [{
          query: Agents
        }]
      })
      .subscribe({
        next: (result: any) => {
         // const updatedUser = result.data.updateUser as Agent;
         const registerReponse=result.data as  DriverResponse;
         console.log(registerReponse.createdeliveryAgent.emailExists);
         console.log(registerReponse.createdeliveryAgent.loginExists);
         this.loginExist = registerReponse.createdeliveryAgent.loginExists;
         this.emailExist  = registerReponse.createdeliveryAgent.emailExists;
         if (!this.loginExist && !this.emailExist)
          {Swal.fire('Add', 'Agent has been added successfully.', 'success');
          }

         this.apollo
         .mutate({
           mutation: infomail,
           variables: { input: input},
           
         })
         .subscribe({
           next: (result: any) => {
            // const updatedUser = result.data.updateUser as Agent
            this.router.navigate(['admin/delvery'])
          //setTimeout(()=>{
            //window.location.reload();
         // }, 2000);
           },
           error: (err) => {
             console.log('err :' + err);
           },
         });
        },
        error: (err) => {
          console.log('err :' + err);
        },
      });
      

      

    }
    
  }
  

}
