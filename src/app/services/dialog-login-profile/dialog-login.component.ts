import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {UserService} from '../user.service';
import {first} from 'rxjs/operators';
import {DialogForgotPasswordService} from '../dialog-forgot-password/dialog-forgot-password.service';
import {ToastrService} from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  private user: any;

  constructor(private activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private dialogForgotPasswordService: DialogForgotPasswordService,
              private toastrService: ToastrService
  ) {
  }

  // getter for access to fields
  get formFields() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
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

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.formFields.username.value, this.formFields.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.userService.setLocalStorage(this.formFields.username.value).subscribe(user => {
            this.user = user;
            this.userService.checkForPenalties(user).toPromise().then();
            this.userService.clearPenalties(user).toPromise().then();
            this.router.navigate(['/homepage']).then();
            this.accept();
          });
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  sendToRegister() {
    this.decline();
  }

  forgotPassword() {
    $.when().then(() => {
      $('#background').ripples('destroy');
      this.userService.forgotPassword(this.formFields.username.value).subscribe(() => {
        this.toastrService.success('The reset code was send');
        this.forgotPasswordDialog();
        this.accept();
      }, error => {
        this.toastrService.error(error);
      });
    });
  }

  forgotPasswordDialog() {
    this.dialogForgotPasswordService.confirm('Login', 'Submit your login details').then(confirmed => {
    })
      .catch(() => {
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)');
        // tslint:disable-next-line:only-arrow-functions
        $(function() {
          $('#background').ripples({
              dropRadius: 20,
              perturbance: 0.002,
              resolution: 256
            }
          );
        });
      });
  }

}
