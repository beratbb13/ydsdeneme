import { AppComponent } from './app.component';
import { HomepageComponent } from './views/pages/homepage/homepage.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ForgetPasswordComponent } from './views/pages/forget-password/forget-password.component'

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbAccordionModule, NbToastrModule, NbLayoutModule, NbButtonModule, NbDialogModule, NbSidebarModule, NbCardModule, NbContextMenuModule, NbMenuModule, NbDialogRef } from '@nebular/theme';
import { NgxSpinnerModule } from "ngx-spinner";
import { ExamPageComponent } from './views/pages/exam-page/exam-page.component';
import { ConfirmationModalComponent } from './views/components/confirmationModal/confirmation-modal/confirmation-modal.component';
import { TextModalComponent } from './views/components/textModal/text-modal/text-modal.component';
import { ProfileComponent } from './views/pages/profile/profile/profile.component';
import { ExamFormComponent } from './views/components/examForm/exam-form/exam-form.component';
import { FooterComponent } from './layout/footer/footer/footer.component';
import { HeaderComponent } from './layout/header/header/header.component';
import { AboutusComponent } from './views/pages/Aboutus/aboutus/aboutus.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChooseExamComponent } from './views/pages/choose-exam/choose-exam.component';
import { ExamFilterComponent } from './views/pages/exam-filter/exam-filter.component';
import { DenemeExamComponent } from './views/pages/ydsdeneme/deneme-exam/deneme-exam.component';
import { ExamResultComponent } from './views/components/testResult/exam-result/exam-result.component';
import { GoOnComponent } from './views/pages/go-on/go-on.component';
import { DenemeSinaviComponent } from './views/pages/deneme-sinavi/deneme-sinavi.component';
import { BeforeDenemeComponent } from './views/pages/before-deneme/before-deneme.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ExamPageComponent,
    ConfirmationModalComponent,
    TextModalComponent,
    ProfileComponent,
    ExamFormComponent,
    FooterComponent,
    HeaderComponent,
    AboutusComponent,
    ChooseExamComponent,
    ExamFilterComponent,
    DenemeExamComponent,
    ExamResultComponent,
    GoOnComponent,
    DenemeSinaviComponent,
    BeforeDenemeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot(),
    NbToastrModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    NbSidebarModule,
    NbCardModule,
    NbContextMenuModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    NbAccordionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
