import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { FrontofficeComponent } from './frontoffice.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FeedbackFormComponent } from './feedbacks/feedback-form/feedback-form';



@NgModule({
  declarations: [
    FrontofficeComponent,
    HeaderComponent,
    FooterComponent,
    FeedbackFormComponent
  
  ],
  imports: [
    CommonModule,
    FrontofficeRoutingModule,
    ReactiveFormsModule
  ]
})
export class FrontofficeModule { }
