import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Registration} from '../../model/Registration';
import {DialogLoginService} from '../dialog-login-profile/dialog-login.service';
import {ToastrService} from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-register.component.html',
  styleUrls: ['./dialog-register.component.css']
})
export class DialogRegisterComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  match = false;
  password: string;


  constructor(private activeModal: NgbActiveModal,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private toastrService: ToastrService) {
  }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userPassword: ['', Validators.required],
      userCompany: ['', [Validators.required]],
      userConfirmPassword: ['', [Validators.required]],
      userEmail: ['', [Validators.required]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    // tslint:disable-next-line:max-line-length
    const registration = new Registration(this.f.userFirstName.value, this.f.userLastName.value, this.f.userPassword.value, this.f.userEmail.value, this.f.userCompany.value);

    this.userService.registerUser(registration).subscribe(value => {
      this.dismiss();
      this.toastrService.success('Your code was send! Please check your email and activate this account!');
      this.goToLogin();
    }, error => {
      this.error = error;
      this.loading = false;
    });
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

  goToLogin() {
    this.decline();
  }

}
