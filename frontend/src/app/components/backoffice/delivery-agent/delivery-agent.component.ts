import { Component, OnInit } from '@angular/core';
import {Agents, deletedeliveryAgent} from "../../../core/graphql/queries/graphql.queries.agent";
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
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private apollo: Apollo, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadUsers();
}

get totalPages(): number {
  return Math.ceil(this.agentList.length / this.itemsPerPage);
}

get startIndex(): number {
  return (this.currentPage - 1) * this.itemsPerPage;
}

get endIndex(): number {
  return this.startIndex + this.itemsPerPage ;
}

get isLastPage(): boolean {
  return this.currentPage === this.totalPages;
}

get isFirstPage(): boolean {
  return this.currentPage === 1;
}

paginate(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

get getPageRange() {
  const start = Math.max(1, this.currentPage - 2);
  const end = Math.min(this.totalPages, this.currentPage + 2);
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
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
    title: 'Are you sure you want to delete this Agent?',
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
          refetchQueries: [{
            query: Agents
          }]
        })
        .subscribe({
          next: (result: any) => {
            const deletedAgent = result.data.deleteUser as Agent;
            this.agentList = this.agentList.filter((agent) => agent.id != deletedAgent.id);
            
            Swal.fire('Deleted', 'Agent has been deleted successfully.', 'success');
          },
          error: (err) => {
            console.log('err :' + err);
          },
        });
    }
  });
}

}