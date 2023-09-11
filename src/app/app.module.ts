import { AppComponent } from './app.component';
import { HomepageComponent } from './views/pages/homepage/homepage.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ForgetPasswordComponent } from './views/pages/forget-password/forget-password.component'

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbToastrModule, NbLayoutModule, NbButtonModule, NbDialogModule, NbSidebarModule, NbCardModule, NbContextMenuModule, NbMenuModule } from '@nebular/theme';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
