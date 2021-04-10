import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './Componets/aboutus/aboutus.component';
import { BlogComponent } from './Componets/blog/blog.component';
import { ContactUsComponent } from './Componets/contact-us/contact-us.component';
import { HomeComponent } from './Componets/home/home.component';
import { JobDetailsComponent } from './Componets/job-details/job-details.component';
import { JobsComponent } from './Componets/jobs/jobs.component';
import { LoginComponent } from './Componets/login/login.component';
import { PageNotFoundComponent } from './Componets/page-not-found/page-not-found.component';
import { PostJobFormComponent } from './Componets/post-job-form/post-job-form.component';
import { RegisterComponent } from './Componets/register/register.component';
import { UserProfileComponent } from './Componets/user-profile/user-profile.component';



const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'about-us', component:AboutusComponent},
  {path:'contact-us', component:ContactUsComponent},
  {path:'jobs', component:JobsComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'post-job', component:PostJobFormComponent},
  {path:'job-details', component:JobDetailsComponent},
  {path:'blog', component:BlogComponent},
  {path:'profile', component:UserProfileComponent},
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
