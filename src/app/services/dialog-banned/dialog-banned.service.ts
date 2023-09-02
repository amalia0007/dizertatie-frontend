import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogBannedComponent} from './dialog-banned.component';


@Injectable()
export class DialogBannedService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    dialogSize: 'sm'|'lg'|'xl' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(DialogBannedComponent, { backdrop: 'static',keyboard:false,size:'lg',centered:true });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    return modalRef.result;
  }

}
