import { ViewProfileComponent } from './blog/view-profile/view-profile.component';
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

import { MyarticlesComponent } from './blog/myarticles/myarticles.component';
import { AuthGuard } from 'src/app/core/helpers/auth.guard';
import { roles } from 'src/app/core/models/role';
import { RealtimechatComponent } from './realtimechat/realtimechat.component';
import { RecommendProductComponent } from './recommend-product/recommend-product.component';
import { CategoryRecommendedProductsComponent } from './category-recommended-products/category-recommended-products.component';

import {  ConversationRoomComponent} from './conversation-room/conversation-room.component';
import { LivechatComponent } from './livechat/livechat.component';
import { ChatbotComponent } from './chabot/chatbot.component';
import { NotificationComponent } from './notification/notification.component';
import { CalendarViewComponent } from './Calendar/calendar-view/calendar-view.component';
import { MapComponent } from './map/map.component';
import { CarbonfootprintComponent } from './carbonfootprint/carbonfootprint.component';


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
      { path: 'latestnew', component: LatestnewsComponent, canActivate: [AuthGuard], data: { roles: [roles.FARMER] } },
      { path: 'detailnews/:id', component: DetailBlogComponent, canActivate: [AuthGuard], data: { roles: [roles.FARMER] } },
      { path: 'marketplace', loadChildren: () => import('./marketplace/marketplace.module').then(m => m.MarketplaceModule) },
      { path: 'feedbacklist', component: FeedbackListPerUserComponent },
      { path: 'addarticle', component: AddArticleComponent },
      { path: 'testimonials', component: TestimonialsComponent},
      { path: 'myarticles', component: MyarticlesComponent, canActivate: [AuthGuard], data: { roles: [roles.FARMER] } },
      { path: 'viewprofile/:id', component: ViewProfileComponent },
      { path: 'myprofile/:id', component: ViewProfileComponent },
      { path: 'Messages/:id', component: RealtimechatComponent },
      { path: 'recommendedproducts', component: RecommendProductComponent},
      { path: 'recommendedproducts/:category', component: CategoryRecommendedProductsComponent },
      { path: 'croprecommendation', component: CropReFormComponent },
      { path: 'Messages', component: ConversationRoomComponent },
      { path: 'chatbot', component: ChatbotComponent },
      { path: 'Map/:id', component: MapComponent },
      { path: 'chat/:id', component: LivechatComponent },
      { path: 'notifications',component: NotificationComponent},
      { path: 'calendar', component: CalendarViewComponent},
      { path: 'carbon', component: CarbonfootprintComponent}

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
