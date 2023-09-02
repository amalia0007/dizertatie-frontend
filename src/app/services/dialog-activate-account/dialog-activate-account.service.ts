import {Injectable} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DialogActivateAccountComponent} from './dialog-activate-account.component';


@Injectable()
export class DialogActivateAccountService {

  constructor(private modalService: NgbModal) {
  }

  public confirm(
    title: string,
    message: string,
    dialogSize: 'sm' | 'lg' | 'xl' = 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(DialogActivateAccountComponent, {
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
