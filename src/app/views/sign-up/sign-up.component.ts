import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastrService,
  ) {

  }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('comfirm_password').value
    return condition ? { passwordsDoNotMatch: true } : null;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
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
      validator: this.passwordValidator
    });
  }

  get email() { return this.signupForm.get('email').value }
  get password() { return this.signupForm.get('password').value }
  get name() { return this.signupForm.get('first_name').value + ' ' + this.signupForm.get('last_name').value }

  signup() {
    this.toast.success("Successfully sign up");
    return this.auth.emailSignUp(this.email, this.password, this.name)
  }

}
