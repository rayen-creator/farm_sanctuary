import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeComponent } from './backoffice.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ClockComponent } from './shared/clock/clock.component';


@NgModule({
  declarations: [
    BackofficeComponent,
    SidebarComponent,
    ClockComponent    
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule
  ]
})
export class BackofficeModule { }
