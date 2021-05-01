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
import { PostJobFormComponent } from './Componets/post-job-form/post-job-form.component';
import { BlogComponent } from './Componets/blog/blog.component';
import { OthersComponent } from './Componets/others/others.component';
import { SingleBlogComponent } from './Componets/single-blog/single-blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './Componets/admin/admin.component';
import { MyblogComponent } from './componets/myblog/myblog.component';
import { MyjobComponent } from './componets/myjob/myjob.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

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
    BlogComponent,
    OthersComponent,
    SingleBlogComponent,
    AdminComponent,
    MyblogComponent, 
    MyblogComponent, MyjobComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    CommonModule,
    NgSelectModule,
    TagInputModule, 
    BrowserAnimationsModule, 
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
