import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeComponent } from './backoffice.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ClockComponent } from './shared/clock/clock.component';
import { UserListComponent } from './users/user-list/user-list.component';


@NgModule({
  declarations: [
    BackofficeComponent,
    SidebarComponent,
    ClockComponent,
    UserListComponent    
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule
  ]
})
export class BackofficeModule { }
