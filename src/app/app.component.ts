import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private modalService: NgbModal) { }

  private openLoginDialog(): void {
    const modalRef = this.modalService.open(LoginComponent);
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  private openSignUpDialog(): void {
    const modalRef = this.modalService.open(SignupComponent);
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
}
