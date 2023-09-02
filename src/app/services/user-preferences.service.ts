import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Game } from '../model/Game';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getAllRecommendedCategories() {
    return this.http.get(`${environment.gameServiceURL}/preferences/Games`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      },
     params: {}
    }) as Observable<Array<Game>>;
  }

}
