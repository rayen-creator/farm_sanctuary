import { FeedbackFormComponent } from './feedbacks/feedback-form/feedback-form';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontofficeComponent } from './frontoffice.component';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  { path: '', component: FrontofficeComponent , children :[
    {path:'feedbacks', component: FeedbackFormComponent}
  ]

},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
