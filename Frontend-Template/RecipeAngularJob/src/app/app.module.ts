import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Componets/header/header.component';
import { FooterComponent } from './Componets/footer/footer.component';
import { HomeComponent } from './Componets/home/home.component';
import { PageNotFoundComponent } from './Componets/page-not-found/page-not-found.component';
import { ContactUsComponent } from './Componets/contact-us/contact-us.component';
import { AboutusComponent } from './Componets/aboutus/aboutus.component';
import { LoginComponent } from './Componets/login/login.component';
import { RegisterComponent } from './Componets/register/register.component';
import { JobsComponent } from './Componets/jobs/jobs.component';
import { JobDetailsComponent } from './Componets/job-details/job-details.component';
import { UserProfileComponent } from './Componets/user-profile/user-profile.component';
import { AppRoutingModule } from './app-routing.module';
<<<<<<< HEAD
import { PostJobFormComponent } from './Componets/post-job-form/post-job-form.component';
import { BlogComponent } from './Componets/blog/blog.component';
=======
>>>>>>> 6485fe530f20fb951f6acb4c94dd910f7c46b17f

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    ContactUsComponent,
    AboutusComponent,
    LoginComponent,
    RegisterComponent,
    JobsComponent,
    JobDetailsComponent,
    UserProfileComponent,
    PostJobFormComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
