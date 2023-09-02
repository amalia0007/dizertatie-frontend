import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from '../model/Image';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../environments/environment';


@Injectable()
export class UploadImageService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  uploadImage(uploadData: FormData) {
    return  this.http.post(`${environment.gameServiceURL}/uploadImage`, uploadData, {
      headers: {
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<Image>;
  }

  removeImage(id: number) {
    return this.http.delete(`${environment.gameServiceURL}/removeImage/` + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticationService.getToken()
      }
    });
  }
}
