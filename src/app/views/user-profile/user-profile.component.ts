import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  signinForm: FormGroup;

  constructor(public fb: FormBuilder, public auth: AuthService) { }

  ngOnInit() {
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
