import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {Rating} from '../model/Rating';
import {ResponsePageList} from '../model/ResponsePageList';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class RatingService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  addRatings(rating: Rating, id: string) {
    return this.http.post(`${environment.gameServiceURL}/addRating`, rating, {
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()},
      params: {
        id
      }
    }) as Observable<any>;
  }

  getPaginatedRatings(orderBy: string, direction: string, page: string, size: string, gameId: string) {
    return this.http.get(`${environment.gameServiceURL}/paginatedRatings`, {
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()},
      params: {
        orderBy,
        direction,
        page,
        size,
        gameId
      }
    }) as Observable<ResponsePageList<Rating>>;
  }

}
