import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginComponent } from './dialogs/login/login.component'
import { SignupComponent } from './dialogs/signup/signup.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'diy-reddit';
  constructor(public dialog: MatDialog) { }

  private openLoginDialog(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(LoginComponent, dialogConfig);

  }

  private openSignUpDialog(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(SignupComponent, dialogConfig);
    
  }

}
