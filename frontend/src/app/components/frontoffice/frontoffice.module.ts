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
import { FeedbackFormComponent } from './feedbacks/feedback-form/feedback-form';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { ChangeMailComponent } from './users/change-mail/change-mail.component';
import { ContactComponent } from './shared/contact/contact.component';
import { AboutComponent } from './shared/about/about.component';
import { DetailBlogComponent } from './blog/detail-blog/detail-blog.component';
import { LatestnewsComponent } from './blog/latestnews/latestnews.component';
import { FeedbackListPerUserComponent } from './feedbacks/feedback-list-per-user/feedback-list-per-user.component';
import { AddArticleComponent } from './blog/add-article/add-article.component'
import { QuillModule } from 'ngx-quill';
import { TestimonialsComponent } from './shared/testimonials/testimonials.component';
import { MyarticlesComponent } from './blog/myarticles/myarticles.component';


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
    FeedbackFormComponent,
    ChangeMailComponent,
    ContactComponent,
    AboutComponent,
    LatestnewsComponent,
    DetailBlogComponent,
    FeedbackListPerUserComponent,
    AddArticleComponent,
    TestimonialsComponent,
    MyarticlesComponent
  ],
  imports: [
    CommonModule,
    FrontofficeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    UiSwitchModule,
    GoogleSigninButtonModule,
    Ng2TelInputModule,
    QuillModule
  ]
})
export class FrontofficeModule { }
