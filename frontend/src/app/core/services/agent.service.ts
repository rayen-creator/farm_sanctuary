import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getAgentbyOrder,addOrder, getAvailableAgent } from '../graphql/queries/graphql.queries.agent';
import { map } from 'rxjs';
import { Agent } from '../models/deliveryAgent';

@Injectable({
  providedIn: 'root'
})
export class AgentService  {

  constructor( private appolo: Apollo) { }

  getAvailableAgent() {
    return this.appolo.watchQuery({
      query: getAvailableAgent
    
    }).valueChanges.pipe(
      map((res: any) => {
        
        const agent = res.data.getAvailableAgent;
        return agent as Agent;
      })
    )
  }
  
  getAgentbyOrder(id: string){
    return this.appolo
      .watchQuery({
        query: getAgentbyOrder,
        variables: {id},
      }).valueChanges.pipe(
        map((res:any) =>{
          const id = res.data.getAgentbyOrder
          return id;
        } )
      );
  }
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
