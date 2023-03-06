import { Component, OnInit } from '@angular/core';
import {Agents, deletedeliveryAgent} from "../../../../app/graphql/graphql.queries.agent";
import {Apollo, gql} from "apollo-angular";
import {Agent} from "../../../../app/core/models/deliveryAgent";
import {DatePipe} from "@angular/common";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-delivery-agent',
  templateUrl: './delivery-agent.component.html',
  styleUrls: ['./delivery-agent.component.css'],
  providers: [DatePipe]
})
export class DeliveryAgentComponent implements OnInit {
 agentList: Agent[];
 
  constructor(private apollo: Apollo, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadUsers();
}


loadUsers() {
  this.apollo
  .watchQuery({
    query: Agents
  }).valueChanges.subscribe({
  next: (result: any) => {
    this.agentList = result.data.getdeliveryAgents as Agent[];
    console.log(this.agentList)
  },
    error: (err) => {
      console.log("err :" + err);
      console.log(this.agentList);
    },
  });
}


deletedeliveryAgent(id: String) {
  Swal.fire({
    title: 'Are you sure you want to delete this user?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete',
  }).then((result) => {
    if (result.isConfirmed) {
      this.apollo
        .mutate({
          mutation: deletedeliveryAgent,
          variables: { id },
        })
        .subscribe({
          next: (result: any) => {
            const deletedAgent = result.data.deleteUser as Agent;
            this.agentList = this.agentList.filter((user) => user.id !== deletedAgent.id);
           
            Swal.fire('Deleted', 'User has been deleted successfully.', 'success');
          },
          error: (err) => {
            console.log('err :' + err);
          },
        });
    }
  });
}

}