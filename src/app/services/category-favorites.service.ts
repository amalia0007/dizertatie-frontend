import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Category } from '../model/Category';
import { ResponsePageList } from '../model/ResponsePageList';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryFavoritesService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }


  getAllCategories() {
    return this.http.get(`${environment.gameServiceURL}/getCategoryList`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<Category[]>;
  }


  getCategoryByName(name: string) {
    return this.http.get(`${environment.gameServiceURL}/getCategoryByName`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      },
     params: {
         name
     }
    }) as Observable<Category>;
  }


  getPaginatedCategories(orderBy: string, direction: string, page: string, size: string, query: string) {
    return this.http.get(`${environment.gameServiceURL}/findCategoryByName`, {
          headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()},
          params: {
            orderBy,
            direction,
            page,
            size,
            query
          }
        }) as Observable<ResponsePageList<Category>>;
  }


  addCategories(categories: Category[]) {
    return this.http.post(`${environment.gameServiceURL}/addCategory`, categories, {
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()}
    }) as Observable<any>;
  }


  checkIfCategoryExists(query: string) {
    return this.http.get(`${environment.gameServiceURL}/checkIfCategoryExist`, {
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()},
      params: {query}
    }) as Observable<any>;
  }


  savePreferences(genres: Category[]) {
    return this.http.post(`${environment.gameServiceURL}/preferences`, genres, {
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authenticationService.getToken()}
    }) as Observable<any>;
  }

}
