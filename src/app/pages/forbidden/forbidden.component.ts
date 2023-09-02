import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {ForbiddenService} from 'src/app/services/forbidden.service';
import * as jwt_decode from 'jwt-decode';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {

  email: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private forbiddenService: ForbiddenService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    const token = this.authenticationService.getToken();
    const decode = jwt_decode(token);
    this.email = decode['sub'];

    // this.username = JSON.parse(localStorage.getItem('currentUser')).email.toString;
  }

  sendToLogin() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  resendVerificationEmail() {
    this.forbiddenService
      .resendVerification(this.email)
      .subscribe(
        data => {
          this.showSuccess();
        },
        error => {
          this.showError(error);
        });
  }

  showSuccess() {
    this.toastr.success('The activation code was sent to your email address', 'Thank you!');
  }

  showError(error: string) {
    this.toastr.error(error, 'Error!');
  }

}
