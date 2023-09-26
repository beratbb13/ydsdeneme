import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ForgetPasswordComponent } from './views/pages/forget-password/forget-password.component';
import { ExamPageComponent } from './views/pages/exam-page/exam-page.component';
import { HomepageComponent } from './views/pages/homepage/homepage.component';
import { ProfileComponent } from './views/pages/profile/profile/profile.component';
import { ExamFormComponent } from './views/components/examForm/exam-form/exam-form.component';
import { AboutusComponent } from './views/pages/Aboutus/aboutus/aboutus.component';
import { ChooseExamComponent } from './views/pages/choose-exam/choose-exam.component';
import { ExamFilterComponent } from './views/pages/exam-filter/exam-filter.component';
import { DenemeExamComponent } from './views/pages/ydsdeneme/deneme-exam/deneme-exam.component';

import { GoOnComponent } from './views/pages/go-on/go-on.component';
import { DenemeSinaviComponent } from './views/pages/deneme-sinavi/deneme-sinavi.component';
import { BeforeDenemeComponent } from './views/pages/before-deneme/before-deneme.component';

import { AuthGuard } from './services/authService/auth.guard';
import { UserDashboardComponent } from './views/pages/user-dashboard/user-dashboard/user-dashboard.component';


const routes: Routes = [
// { path: '', component: LoginComponent },
{ path: '', component: ChooseExamComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'forgetpassword', component: ForgetPasswordComponent },
{ path: 'choose', component: ChooseExamComponent },
{ path: 'goon', component: GoOnComponent },
{ path: 'deneme-sinavi', component: DenemeSinaviComponent },

{ path: 'dashboard', component:UserDashboardComponent,canActivate: [AuthGuard]  },



  {
    path: 'homepage', component: HomepageComponent, children: [
      { path: 'aboutus', component: AboutusComponent,canActivate: [AuthGuard] },
      { path: 'exampage', component: ExamPageComponent ,canActivate: [AuthGuard]},
      { path: 'examform', component: ExamFormComponent,canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent ,canActivate: [AuthGuard]},
      { path: 'filter', component: ExamFilterComponent,canActivate: [AuthGuard] },
      { path: 'deneme', component: DenemeExamComponent,canActivate: [AuthGuard] },


    ], canActivate: [AuthGuard]
  },
];

/*


  { path: 'register', component: RegisterComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: 'exampage', component: ExamPageComponent },
  {
    path: '', component: HomepageComponent, children: [
      { path: 'examform', component: ExamFormComponent },
    ]
  },
  { path: 'profile', component: ProfileComponent },




  { path: 'register', component: RegisterComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: 'exampage', component: ExamPageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'profile', component: ProfileComponent },

*/

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
