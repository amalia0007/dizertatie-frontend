import {Injectable} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DialogForgotPasswordComponent} from './dialog-forgot-password.component';


@Injectable()
export class DialogForgotPasswordService {

  constructor(private modalService: NgbModal) {
  }

  public confirm(
    title: string,
    message: string,
    dialogSize: 'sm' | 'lg' | 'xl' = 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(DialogForgotPasswordComponent, {
      backdrop: 'static',
      keyboard: false,
      size: dialogSize,
      centered: true
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    return modalRef.result;
  }

}
