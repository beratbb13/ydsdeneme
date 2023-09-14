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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: 'choose', component: ChooseExamComponent },

  {
    path: 'homepage', component: HomepageComponent, children: [
      { path: 'aboutus', component: AboutusComponent },
      { path: 'exampage', component: ExamPageComponent },
      { path: 'examform', component: ExamFormComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'filter', component: ExamFilterComponent },
      { path: 'deneme', component: DenemeExamComponent },

    ]
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
