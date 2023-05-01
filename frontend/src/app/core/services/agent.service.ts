import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { addOrder } from '../graphql/queries/graphql.queries.agent';

@Injectable({
  providedIn: 'root'
})
export class AgentService  {

  constructor( private appolo: Apollo) { }


  

  addOrdertoagent(id:any,idorder:any) {
    return this.appolo.mutate({
      mutation: addOrder,
      variables: {
        id: id,
        idorder: idorder
      } 
    })
    .subscribe({
      next: (res) => {   
        const message = res;
        console.log("log:",message)
      },
      error: (err) => {
        console.log(err); 
      },
    });
    
  }

}
