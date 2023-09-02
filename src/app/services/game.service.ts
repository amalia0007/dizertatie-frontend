import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from '../model/Game';
import {Observable} from 'rxjs';
import {ResponsePageList} from '../model/ResponsePageList';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../environments/environment';


@Injectable()
export class GameService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  getAllGames() {
    return this.http.get(`${environment.gameServiceURL}/games`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<Game[]>;
  }


  getGameById(id: string) {
    return this.http.get(`${environment.gameServiceURL}/searchGameById`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      },
     params: {
        id
     }
    }) as Observable<Game>;
  }

  getGamesFromAPI(query: string) {
    return this.http.get(`${environment.gameServiceURL}/searchGame`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      },
      params: {
        query
      }
    }) as Observable<Game[]>;
  }

  getPaginatedGames(orderBy: string, direction: string, page: string, size: string, query: string) {
      return this.http.get(`${environment.gameServiceURL}/paginatedGames`, {
            headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()},
            params: {
              orderBy,
              direction,
              page,
              size,
              query
            }
          }) as Observable<ResponsePageList<Game>>;
  }
  getSameCategoryGames(orderBy: string, direction: string, page: string, size: string, id: string) {
    return this.http.get(`${environment.gameServiceURL}/sameCategoryGames`, {
          headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()},
          params: {
            orderBy,
            direction,
            page,
            size,
            id
          }
        }) as Observable<ResponsePageList<Game>>;
}


  getPaginatedFavoriteGames(orderBy: string, direction: string, page: string, size: string, id: string) {
    return this.http.get(`${environment.gameServiceURL}/preferredGames`, {
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()},
      params: {
        orderBy,
        direction,
        page,
        size,
        id
      }
    }) as Observable<ResponsePageList<Game>>;
  }

  addGame(game: Game) {
    return this.http.post(`${environment.gameServiceURL}/addGame`, game, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      },
      params: undefined,
      reportProgress: false,
      responseType: 'json',
      withCredentials: false
    }) as Observable<any>;
  }

  removeGame(id: number) {
    return this.http.delete(`${environment.gameServiceURL}/remove/` + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    });
  }

}
