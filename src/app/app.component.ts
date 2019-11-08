import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './dialogs/login/login.component'
import { SignupComponent } from './dialogs/signup/signup.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  email: string;
  password: StaticRange;

  constructor(public dialog: MatDialog) { }

  private openLoginDialog(): void{
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      data: {email: this.email, password: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
    });
  }

  private openSignUpDialog(): void{
    let dialogRef = this.dialog.open(SignupComponent, {
      width: '250px',
      data: {email: this.email, password: this.password}
    });
  }
}
