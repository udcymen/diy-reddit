import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PostComponent } from './views/post/post.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { CreatePostComponent } from './views/create-post/create-post.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'post/:id', component: PostComponent},
  {path:'new-post', component: CreatePostComponent},
  {path:'account', component: UserProfileComponent},
  {path:'sign-up', component: SignUpComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
