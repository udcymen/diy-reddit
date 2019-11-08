import { Component, OnInit } from '@angular/core';
import {NgbPaginationModule, NgbActiveModal, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  constructor( public activeModal: NgbActiveModal ) { }

  private closeModal(): void {
    this.activeModal.close('Modal Closed');
  }

  ngOnInit() {
  }

}
