import { DeliveryAgentEditComponent } from './delivery-agent-edit/delivery-agent-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import {DeliveryAgentComponent} from "./delivery-agent/delivery-agent.component";
const routes: Routes = [
  {
    path: '', component: BackofficeComponent, children: [
      {path:'delvery', component: DeliveryAgentComponent},
      {path:'delveryEdit/:id', component: DeliveryAgentEditComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
