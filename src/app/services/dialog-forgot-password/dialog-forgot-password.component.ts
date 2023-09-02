import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../user.service';
import {ToastrService} from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.css']
})
export class DialogForgotPasswordComponent {

  @Input() title: string;
  @Input() message: string;
  loading = false;
  error = '';
  code: any;
  password: any;
  confirmPassword: any;
  yourEmail: any;

  constructor(private activeModal: NgbActiveModal,
              private userService: UserService,
              private toastrService: ToastrService,
  ) {
  }

  public decline() {
    this.activeModal.close(false);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public accept() {
    this.activeModal.close(true);
  }

  resetPassword() {
    this.loading = true;
    this.userService.resetPassword(this.yourEmail, this.password, this.code).subscribe(() => {
      this.toastrService.success('Your password was changed');
      this.loading = false;
      this.accept();
    }, error => {
      this.loading = false;
      this.toastrService.error(error);
    });

  }
}
