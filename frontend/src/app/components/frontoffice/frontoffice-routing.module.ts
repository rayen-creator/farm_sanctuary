import { ContactComponent } from './shared/contact/contact.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { FeedbackFormComponent } from './feedbacks/feedback-form/feedback-form';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontofficeComponent } from './frontoffice.component';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetpwdComponent } from './auth/resetpwd/resetpwd.component';
import { UpdatepwdComponent } from './auth/updatepwd/updatepwd.component';
import { RegistermainpageComponent } from './auth/registermainpage/registermainpage.component';
import { UserProfileComponent } from "./users/user-profile/user-profile.component";
import { ErrorresetpwdComponent } from './auth/errorresetpwd/errorresetpwd.component';
import { AboutComponent } from './shared/about/about.component';

const routes: Routes = [
  {
    path: '', component: FrontofficeComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup/:accountType', component: RegisterComponent },
      { path: 'signup', component: RegistermainpageComponent },
      { path: 'profile/:id', component: UserProfileComponent },
      { path: 'forgetpassword', component: ResetpwdComponent },
      { path: 'resetpassword/:token', component: UpdatepwdComponent },
      { path: 'error', component: ErrorresetpwdComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
      {path:'feedbacks', component: FeedbackFormComponent}


    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
