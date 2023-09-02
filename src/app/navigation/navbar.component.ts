import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {UserService} from '../services/user.service';
import {UserData} from '../model/UserData';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen: any;
  private decode: any;
  email: any;
  private currentUser: any;
  UserData: UserData;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.decode = jwt_decode(localStorage.getItem('currentUser'));
      this.email = this.decode.sub;
      this.userService.getUserByEmail(this.email).subscribe(user => this.UserData = user);
    } else {
      this.email = 'No user';
    }
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  goToRentedGames() {
    this.router.navigate(['/rented-games']);
  }

  isAdmin() {
    return !!this.UserData && this.UserData.roles.filter(role => role.type == 'ROLE_ADMIN' || role.type == 'ROLE_SUPER_ADMIN').length == 1;
  }

}
