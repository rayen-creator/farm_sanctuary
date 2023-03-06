import { NotfoundComponent } from './shared/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontofficeComponent } from './frontoffice.component';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetpwdComponent } from './auth/resetpwd/resetpwd.component';
import { UpdatepwdComponent } from './auth/updatepwd/updatepwd.component';

const routes: Routes = [
  {
    path: '', component: FrontofficeComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgetpassword', component: ResetpwdComponent },
      { path: 'resetpassword', component: UpdatepwdComponent },

    ]

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
