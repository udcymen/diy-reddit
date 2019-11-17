import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {

  }

  user: User;

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    })
    this.createForm();
  }

  onSelectFile($event){

  }

  googleSignIn(){
    this.auth.googleSignin();
  }

  signOut(){
    this.auth.signOut();
  }

  createForm() {
    this.signinForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.required
      ]
      ]
    });
  }

  get email() { return this.signinForm.get('email').value }
  get password() { return this.signinForm.get('password').value }

  signin() {
    return this.auth.emailSignIn(this.email, this.password)
  }

}
