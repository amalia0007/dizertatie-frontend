import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../model/User';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

declare var $: any;

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    return token ? token : '';
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.userServiceURL}/authenticate`, {email, password})
      .pipe(map(token => {
        localStorage.setItem('currentUser', JSON.stringify(token));
        this.currentUserSubject.next(token);
        return token;
      }));
  }

  logout() {
    this.router.navigate(['']);
    localStorage.clear();
    $(function() {
      $('#background').ripples({
          dropRadius: 20,
          perturbance: 0.002,
          resolution: 256
        }
      );
    });
    this.currentUserSubject.next(null);
  }

  resendVerification(email: string) {
    return this.http.post(`${environment.userServiceURL}/resendVerificationLink`, email) as Observable<any>;
  }
}
