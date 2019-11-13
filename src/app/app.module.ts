
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { MatCheckboxModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { PostComponent } from './views/post/post.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { AuthService } from './services/auth/auth.service';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { CreatePostComponent } from './views/create-post/create-post.component';


const firebase = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule,
  AngularFireAuthModule,
  AngularFireStorageModule
]

const materials = [
  MatCheckboxModule,
  MatButtonModule,
  MatDialogModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  CommonModule,
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    UserProfileComponent,
    SignUpComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    materials,
    firebase,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    ToastrModule.forRoot(environment.toast)
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
