import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import * as jwt_decode from 'jwt-decode';
import {ConfirmationDialogService} from '../services/dialog-confirm/dialog-confirm.service';
import {DialogBannedService} from '../services/dialog-banned/dialog-banned.service';
import {DialogActivateAccountService} from '../services/dialog-activate-account/dialog-activate-account.service';
import {UserService} from '../services/user.service';
import {UserData} from '../model/UserData';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  private decoded: any;
  private updatedUser: UserData;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private dialogBannedService: DialogBannedService,
    private confirmationDialogService: ConfirmationDialogService,
    private activateAccountService: DialogActivateAccountService,
    private userService: UserService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {

      const token = this.authenticationService.getToken();
      this.decoded = jwt_decode(token);
      const email = this.decoded.sub;
      await this.userService.getUserByEmail(email).toPromise().then(user => {
        this.updatedUser = user;
        if (this.updatedUser.banUntil) {
          if (new Date(this.updatedUser.banUntil) < new Date()) {
            this.updatedUser.banned = false;
            this.updatedUser.banUntil = null;
            this.userService.updateUser(this.updatedUser).toPromise().then().catch(reason => console.log(reason));
            this.userService.getUserByEmail(email).toPromise().then().catch(reason => console.log(reason));
          }
        }
      });
      const date = new Date(0).setUTCSeconds(this.decoded.exp);
      if (date.valueOf() > new Date().valueOf()) {
        if (this.updatedUser.enabled) {
          if (!this.updatedUser.banned) {
            if (this.updatedUser.skipped) {
              return true;
            } else {
              // debugger;
              // return true;
              await this.router.navigate(['/game-preferences']);
            }
          } else {
            this.bannedUserDialog();
            return false;
          }
        } else {
          this.notEnabledUserDialog();
          return false;
        }
      } else {
        this.authenticationService.logout();
      }
    } else {
      this.authenticationService.logout();
    }
  }

  bannedUserDialog() {
    this.router.navigate(['']);
    this.dialogBannedService.confirm('This account is banned!', 'Please contact your administrator!')
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  notEnabledUserDialog() {
    this.activateAccountService.confirm('This account is not activated', 'Please activate your account').catch(() => {
      this.authenticationService.logout();
      console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)');
    });
  }

}
