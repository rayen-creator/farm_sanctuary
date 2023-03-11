import { NotfoundComponent } from './shared/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontofficeComponent } from './frontoffice.component';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetpwdComponent } from './auth/resetpwd/resetpwd.component';
import { UpdatepwdComponent } from './auth/updatepwd/updatepwd.component';
import { RegistermainpageComponent } from './auth/registermainpage/registermainpage.component';
import { TwoFactorauthComponent } from './auth/two-factorauth/two-factorauth.component';

const routes: Routes = [
  {
    path: '', component: FrontofficeComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup/:accountType', component: RegisterComponent },
      { path: 'signup', component: RegistermainpageComponent },

      { path: 'forgetpassword', component: ResetpwdComponent },
      { path: 'resetpassword/:token', component: UpdatepwdComponent },
      //verify the display of the template then it will be deleted
      { path: 'twofactorauth', component: TwoFactorauthComponent },

     // { path: 'twofactorauth/:token', component: TwoFactorauthComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
