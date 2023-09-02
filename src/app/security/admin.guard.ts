import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../services/user.service';
import {Injectable} from '@angular/core';
import {UserData} from '../model/UserData';
import {AuthenticationService} from '../services/authentication.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {

  private user: UserData;

  constructor(private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.authenticationService.getToken();
    const decode = jwt_decode(token);
    const email = decode['sub'];
    this.user = await this.userService.getUserByEmail(email).toPromise();
    if (this.user.admin) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }


}
