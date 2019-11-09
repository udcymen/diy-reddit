import { Component, OnInit } from '@angular/core';
import { MatDialog } from  '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private email: string = "";
  private password: string = "";
  
  constructor( private dialog: MatDialog ) { }

  postLogin(){
    console.log(this.email);
    console.log(this.password);

  }

  ngOnInit() {
  }

}
