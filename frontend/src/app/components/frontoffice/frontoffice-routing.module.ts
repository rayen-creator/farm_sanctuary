import { TestimonialsComponent } from './shared/testimonials/testimonials.component';
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
import { TwoFAComponent } from '../two-fa/two-fa.component';
import { ChangeMailComponent } from './users/change-mail/change-mail.component';
import { DetailBlogComponent } from './blog/detail-blog/detail-blog.component';
import { LatestnewsComponent } from './blog/latestnews/latestnews.component';
import { FeedbackListPerUserComponent } from './feedbacks/feedback-list-per-user/feedback-list-per-user.component';
import { AddArticleComponent } from './blog/add-article/add-article.component';
import { CropReFormComponent } from './cropRecommandation/crop-re-form/crop-re-form.component';



const routes: Routes = [
  {
    path: '', component: FrontofficeComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup/:accountType', component: RegisterComponent },
      { path: 'signup', component: RegistermainpageComponent },
      { path: 'profile/:id', component: UserProfileComponent },
      { path: 'profile/:id/twofactorauth', component: TwoFAComponent },
      { path: 'change-email', component: ChangeMailComponent },
      { path: 'forgetpassword', component: ResetpwdComponent },
      { path: 'resetpassword/:token', component: UpdatepwdComponent },
      { path: 'error', component: ErrorresetpwdComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
      { path: 'addfeedback', component: FeedbackFormComponent },
      { path: 'latestnew', component: LatestnewsComponent },
      { path: 'detailnews', component: DetailBlogComponent },
      { path: 'marketplace', loadChildren: () => import('./marketplace/marketplace.module').then(m => m.MarketplaceModule) },
      { path: 'feedbacklist', component: FeedbackListPerUserComponent },
      { path: 'addarticle', component: AddArticleComponent },
      { path: 'testimonials', component: TestimonialsComponent},
      { path: 'croprecommendation', component: CropReFormComponent}


    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
