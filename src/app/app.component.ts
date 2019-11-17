import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { User } from './models/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "diy-reddit"
  user: User;

  constructor(
    private auth: AuthService,
  ) {
    this.auth.user$.subscribe(user => {
      this.user = user;
    })
  }

}
