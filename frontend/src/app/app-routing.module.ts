import { NotfoundComponent } from './components/frontoffice/shared/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/frontoffice/frontoffice.module').then(m => m.FrontofficeModule) },
  { path: 'admin', loadChildren: () => import('./components/backoffice/backoffice.module').then(m => m.BackofficeModule) },
  { path: '**', component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
