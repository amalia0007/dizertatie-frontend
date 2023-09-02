import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {UserService} from '../user.service';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../authentication.service';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-activate-account.component.html',
  styleUrls: ['./dialog-activate-account.component.css']
})
export class DialogActivateAccountComponent {

  @Input() title: string;
  @Input() message: string;
  loading = false;
  loadingForCode = false;
  error = '';
  code: any;

  constructor(private activeModal: NgbActiveModal,
              private userService: UserService,
              private toastrService: ToastrService,
              private authenticationService: AuthenticationService,
              private router: Router
  ) {
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public accept() {
    this.activeModal.close(true);
  }

  activateAccount() {
    this.loading = true;
    this.userService.registerConfirm(this.code).subscribe(() => {
      this.toastrService.success('User account activated!');
      this.accept();
      this.router.navigate(['/homepage']);
    }, error => {
      this.loading = false;
      this.toastrService.error(error);
    });
  }

  resendVerificationEmail() {
    this.loadingForCode = true;
    let token = this.authenticationService.getToken();
    let decode = jwt_decode(token);
    let email = decode['sub'];
    this.userService.resendVerification(email).subscribe(value => {
      this.toastrService.success('We just send your code again!');
      this.loadingForCode = false;
    }, error => {
      this.toastrService.error(error);
      this.loadingForCode = false;
    });

  }
}
