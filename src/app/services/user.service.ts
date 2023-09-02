import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Game} from '../model/Game';
import {Registration} from '../model/Registration';
import {AuthenticationService} from './authentication.service';
import {map} from 'rxjs/operators';
import {ResponsePageList} from '../model/ResponsePageList';
import {UserData} from '../model/UserData';
import {User} from '../model/User';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  getAll() {
    return this.http.get<Game[]>(`${environment.userServiceURL}/games`);
  }

  getUserByEmail(email: string) {
    return this.http.get<any>(`${environment.userServiceURL}/findUserByEmail`, {
      headers: {
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      },
      params: {email}
    }) as Observable<any>;
  }

  setLocalStorage(email: string) {
    return this.http.get<any>(`${environment.userServiceURL}/findUserByEmail`, {
      headers: {
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      },
      params: {email}
    })
      .pipe(map(obj => {
        localStorage.setItem('showRented', 'false');
        return obj;
      }));
  }

  getPaginatedUsers(orderBy: string, direction: string, page: string, size: string, query: string) {
    return this.http.get(`${environment.userServiceURL}/v2/paginatedUsers`, {
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()},
      params: {
        page: page,
        size: size,
        sort: orderBy + "," + direction,
        userName: query
      }
    }) as Observable<ResponsePageList<UserData>>;
  }

  makeAdmin(user: User) {
    return this.http.put(`${environment.userServiceURL}/v2/makeAdmin/${user.id}`, null, {
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()},
    }) as Observable<ResponsePageList<any>>;
  }

  registerUser(registration: Registration) {
    return this.http.post(`${environment.userServiceURL}/register`, registration, {
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()}
    }) as Observable<any>;
  }

  updateUser(user: User) {
    return this.http.put(`${environment.userServiceURL}/updateUser`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }

  updateUserBanned(user: User) {
    return this.http.put(`${environment.userServiceURL}/updateUserBanned`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }

  updateUserBanUntil(user: User) {
    return this.http.put(`${environment.userServiceURL}/updateUserBanUntil`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }


  updateUserImg(user: User) {
    return this.http.put(`${environment.userServiceURL}/updateUserImg`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }

  clearPenalties(user: UserData) {
    return this.http.post(`${environment.userServiceURL}/clearPenalties`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }

  addOnePenalty(user: UserData) {
    return this.http.post(`${environment.userServiceURL}/addPenalty`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }

  removeOnePenalty(user: UserData, id) {
    return this.http.post(`${environment.userServiceURL}/removePenalty`, user, {
      params: {
        penaltyId: id
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }

  checkForPenalties(user: UserData) {
    return this.http.post(`${environment.userServiceURL}/checkForPenalties`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }

  forgotPassword(email: string) {
    return this.http.post(`${environment.userServiceURL}/forgotPassword`, {email}, {}) as Observable<any>;
  }

  resetPassword(email: string, password: string, code: string) {
    return this.http.post(`${environment.userServiceURL}/resetPassword`, {email, password}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      },
      params: {
        random: code
      }
    }) as Observable<any>;
  }

  findVerificationTokenByEmail(email: string) {
    return this.http.get(`${environment.userServiceURL}/findVerificationTokenByEmail`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      },
      params: {
        email
      }
    }) as Observable<any>;
  }

  registerConfirm(activationToken: string) {
    return this.http.get(`${environment.userServiceURL}/registerConfirm`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      },
      params: {
        token: activationToken
      }
    }) as Observable<any>;
  }

  resendVerification(email: string) {
    return this.http.post(`${environment.userServiceURL}/resendVerificationLink`, email) as Observable<any>;
  }


}
