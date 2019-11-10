import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;

  constructor(public fb: FormBuilder, public auth: AuthService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
        ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
        ]
      ],
      'comfirm_password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
        ]
      ],
      'first_name': ['', [
        Validators.required
        ]
      ],
      'last_name': ['', [
        Validators.required
        ]
      ],
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  get email() { return this.signupForm.get('email').value }
  get password() { return this.signupForm.get('password').value }
  get name() { return this.signupForm.get('first_name').value + ' ' + this.signupForm.get('last_name').value }

  signup() {
    return this.auth.emailSignUp(this.email, this.password, this.name)
  }

}

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
     let password = AC.get('password').value; // to get value in input tag
     let confirmPassword = AC.get('comfirm_password').value; // to get value in input tag
      if(password != confirmPassword) {
          AC.get('comfirm_password').setErrors( {MatchPassword: true} )
      } else {
          return null
      }
  }
}
