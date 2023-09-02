import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Developer} from '../model/Developer';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class DeveloperService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  addDevelopers(devs: Developer[]) {
    return this.http.post(`${environment.gameServiceURL}/addDevelopers`, devs, {
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()}
    }) as Observable<any>;
  }

  checkIfDeveloperExists(query: string) {
    return this.http.get(`${environment.userServiceURL}/checkIfDeveloperExists`, {
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()},
      params: {query}
    }) as Observable<any>;
  }

  getDeveloperByName(query: string) {
    return this.http.get(`${environment.userServiceURL}/getDeveloperByName`, {
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()},
      params: {query}
    }) as Observable<any>;
  }
}
