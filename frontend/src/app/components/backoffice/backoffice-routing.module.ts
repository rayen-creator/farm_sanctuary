import { AdminDashboardComponent } from './dashboard/dashboard-items/dashboard-items.component';
import { DeliveryAgentEditComponent } from './delivery-agent-edit/delivery-agent-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import {UserListComponent} from "./users/user-list/user-list.component";
import {DeliveryAgentComponent} from "./delivery-agent/delivery-agent.component";
const routes: Routes = [
  {
    path: '', component: BackofficeComponent, children: [
      {path :'' , redirectTo : 'dashboard' , pathMatch :'full'},
      {path:'users', component: UserListComponent},
      {path:'dashboard',component:AdminDashboardComponent}      ,
      {path:'delvery', component: DeliveryAgentComponent},
      {path:'delveryEdit/:id', component: DeliveryAgentEditComponent},
      {path:'delveryAdd', component: DeliveryAgentEditComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
