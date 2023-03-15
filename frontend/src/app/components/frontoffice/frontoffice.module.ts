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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UiSwitchModule } from 'ngx-toggle-switch';
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";



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
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    FrontofficeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    UiSwitchModule,
    GoogleSigninButtonModule
  ]
})
export class FrontofficeModule { }
