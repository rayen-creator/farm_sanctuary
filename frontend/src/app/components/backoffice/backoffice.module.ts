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
import { FeedbackListComponent } from './Feedbacks/feedback-list/feedback-list.component';
import { AvailableBadgesComponent } from './dashboard/available-badges/available-badges.component';
import { OrderListComponent } from './orders/order-list/order-list.component';


@NgModule({
  declarations: [
    BackofficeComponent,
    SidebarComponent,
    ClockComponent,
    UserListComponent,
    DeliveryAgentComponent,
    AdminDashboardComponent,
    DeliveryAgentEditComponent,
    FeedbackListComponent,
    AvailableBadgesComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,

  ]
})
export class BackofficeModule { }
