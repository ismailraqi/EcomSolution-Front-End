import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { User } from '../modals/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  readonly rootUrl = 'http://localhost:51603';
  constructor(private http: HttpClient) { }
  RegisterUser (user:any)
  {
    return this.http.post(this.rootUrl + '/api/Account/Register',user)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} 

}