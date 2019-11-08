import { Component, OnInit } from '@angular/core';
import {NgbPaginationModule, NgbActiveModal, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( public activeModal: NgbActiveModal ) { }

  private closeModal(): void {
    this.activeModal.close('Modal Closed');
  }

  ngOnInit() {
  }

}
