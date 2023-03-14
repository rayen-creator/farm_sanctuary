import { roles } from './core/models/role';
import { NotfoundComponent } from './components/frontoffice/shared/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/frontoffice/frontoffice.module').then(m => m.FrontofficeModule),

  },
  {
    path: 'admin', loadChildren: () => import('./components/backoffice/backoffice.module').then(m => m.BackofficeModule),
    // canActivate: [AuthGuard], data: { roles: [roles.ADMIN] }
  },
  { path: '**', component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
