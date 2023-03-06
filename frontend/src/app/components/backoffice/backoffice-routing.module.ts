import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import {DeliveryAgentComponent} from "./delivery-agent/delivery-agent.component";
const routes: Routes = [
  {
    path: '', component: BackofficeComponent, children: [
      {path:'delvery', component: DeliveryAgentComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
