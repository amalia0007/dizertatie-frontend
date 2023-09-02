import {Injectable} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DialogRegisterComponent} from './dialog-register.component';


@Injectable()
export class DialogRegisterService {

  constructor(private modalService: NgbModal) {
  }

  public confirm(
    title: string,
    message: string,
    dialogSize: 'sm' | 'lg' | 'xl' = 'lg'): Promise<boolean> {
    const modalRef = this.modalService.open(DialogRegisterComponent, {
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
