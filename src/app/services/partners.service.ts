import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Company} from '../model/Company';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  getAll() {
    return this.http.get<Company[]>(`${environment.userServiceURL}/company`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }

}
