import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PostComponent } from './views/post/post.component';
import { AboutComponent } from './views/about/about.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'post', component: PostComponent},
  {path:'account', component: UserProfileComponent},
  {path:'about', component: AboutComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
