import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/frontoffice/frontoffice.module').then(m => m.FrontofficeModule) }, 
  { path: 'backoffice', loadChildren: () => import('./components/backoffice/backoffice.module').then(m => m.BackofficeModule) }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
