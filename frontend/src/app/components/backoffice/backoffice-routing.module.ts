import { AdminDashboardComponent } from './dashboard/dashboard-items/dashboard-items.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import {UserListComponent} from "./users/user-list/user-list.component";

const routes: Routes = [
  {
    path: '', component: BackofficeComponent, children: [
      {path :'' , redirectTo : 'dashboard' , pathMatch :'full'},
      {path:'users', component: UserListComponent},
      {path:'dashboard',component:AdminDashboardComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
