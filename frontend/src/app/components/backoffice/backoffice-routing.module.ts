import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { FeedbackListComponent } from './Feedbacks/feedback-list/feedback-list.component';

const routes: Routes = [
  {
    path: '', component: BackofficeComponent, children: [
      {path:'feedbacks', component: FeedbackListComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
