import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeComponent } from './backoffice.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ClockComponent } from './shared/clock/clock.component';
import { UserListComponent } from './users/user-list/user-list.component';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import { AdminDashboardComponent } from './dashboard/dashboard-items/dashboard-items.component';
import { NgApexchartsModule } from 'ng-apexcharts';

import { DeliveryAgentComponent } from './delivery-agent/delivery-agent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryAgentEditComponent } from './delivery-agent-edit/delivery-agent-edit.component';


@NgModule({
  declarations: [
    BackofficeComponent,
    SidebarComponent,
    ClockComponent,
    UserListComponent,
    DeliveryAgentComponent,
    AdminDashboardComponent,
    DeliveryAgentEditComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    FormsModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BackofficeModule { }
