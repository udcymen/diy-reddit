import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(    
    private toastr: ToastrService
  ) {

  }

  // ========================================
  // Show Erroe
  // ========================================
  public showError(title, message) {
    this.toastr.error(message, title);
  }
}
