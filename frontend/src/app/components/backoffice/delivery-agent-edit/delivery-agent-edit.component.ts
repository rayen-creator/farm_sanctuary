import { Component, OnInit } from '@angular/core';
import {updatedeliveryAgent, getdeliveryAgent} from "../../../../app/graphql/graphql.queries.agent";
import {Apollo, gql} from "apollo-angular";
import {Agent} from "../../../../app/core/models/deliveryAgent";
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    
    let fullname = ""
    let email =""
    let phone =null
    let login = ""
   
     const e = this.agent
      fullname = e.fullName
      email = e.email
      phone = e.phone
      login = e.login
      console.log(e)
    this.AgentForm = new FormGroup({
      'login': new FormControl(login,Validators.required,),
      'phone': new FormControl(phone, Validators.required),
      'email': new FormControl(email, Validators.required),
      'fullname': new FormControl(fullname, Validators.required),
      })
  }


  onSubmit() {
    console.log(this.AgentForm )
    let id= this.currentRoute.snapshot.params['id'];
    let newAgznt =this.AgentForm
      this.apollo
      .mutate({
        mutation: updatedeliveryAgent,
        variables: {id ,newAgznt },
      })
      .subscribe({
        next: (result: any) => {
          const updatedeliveryAgent = result.data.updatedeliveryAgent as Agent;
          
          Swal.fire('Updated', 'Agent has been Updated successfully.', 'success');
          this.router.navigate(['/admin/delvery'])
        },
        error: (err) => {
          console.log('err :' + err);
        },
      });
   
}
  
  

}
