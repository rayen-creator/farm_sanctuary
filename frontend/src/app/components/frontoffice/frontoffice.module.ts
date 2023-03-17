import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { FrontofficeComponent } from './frontoffice.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetpwdComponent } from './auth/resetpwd/resetpwd.component';
import { UpdatepwdComponent } from './auth/updatepwd/updatepwd.component';
import { RegistermainpageComponent } from './auth/registermainpage/registermainpage.component';
import { ErrorresetpwdComponent } from './auth/errorresetpwd/errorresetpwd.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import {FormsModule} from "@angular/forms";
import { UiSwitchModule } from 'ngx-toggle-switch';
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";
import { ContactComponent } from './shared/contact/contact.component';
import { AboutComponent } from './shared/about/about.component';
import { FeedbackFormComponent } from './feedbacks/feedback-form/feedback-form';
import {Ng2TelInputModule} from 'ng2-tel-input';


@NgModule({
  declarations: [
    FrontofficeComponent,
    HeaderComponent,
    FooterComponent,
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    ResetpwdComponent,
    UpdatepwdComponent,
    RegistermainpageComponent,
    ErrorresetpwdComponent,
    UserProfileComponent,
    ContactComponent,
    FeedbackFormComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    FrontofficeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    UiSwitchModule,
    GoogleSigninButtonModule,
    Ng2TelInputModule,
    
  ]
})
export class FrontofficeModule { }
