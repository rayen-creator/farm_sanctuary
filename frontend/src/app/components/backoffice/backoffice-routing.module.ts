import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import {UserListComponent} from "./users/user-list/user-list.component";

const routes: Routes = [
  {
    path: '', component: BackofficeComponent, children: [
      {path:'users', component: UserListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
