import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Game} from '../model/Game';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import {UserGame} from '../model/UserGame';
import {environment} from '../../environments/environment';


@Injectable()
export class UserGameService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  addUserGame(user: User, game: Game, returnDate: string) {

    const newUserGame = new UserGame(user, game, returnDate, false);

    console.log(newUserGame);
    return this.http.post(`${environment.userServiceURL}/addUserGame`, newUserGame, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }

  getRentedGames(orderBy: string, direction: string, page: string, size: string, id: string) {
    return this.http.get(`${environment.userServiceURL}/getRentedGames`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      },
      params: {
        orderBy,
        direction,
        page,
        size,
        id
      }
    }) as Observable<any>;

  }

  returnRentedGame(userGame: UserGame) {
    return this.http.post(`${environment.userServiceURL}/returnGame`, userGame, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      },
      params: {
        id: userGame.id.toString()
      }
    }) as Observable<any>;
  }


  getDataChart() {
    return this.http.get(`${environment.userServiceURL}/populateChart`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }

  getStatusDataChart() {
    return this.http.get(`${environment.userServiceURL}/populateStatus`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<any>;
  }

}
