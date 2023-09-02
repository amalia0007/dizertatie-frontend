import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class CategoryService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }


  getAllUnique() {
    return this.http.get(`${environment.gameServiceURL}/getCategoryList`, {
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()}
    }) as Observable<any>;
  }

}
