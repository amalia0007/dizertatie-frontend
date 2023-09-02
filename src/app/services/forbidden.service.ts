import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/User';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenService {


  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  resendVerification(email: string) {
    return this.http.post(`${environment.userServiceURL}/resendVerificationLink`, email) as Observable<any>;
  }

}
