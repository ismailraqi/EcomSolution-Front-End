import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  readonly rootUrl = 'http://localhost:51603/';
  constructor(private http: HttpClient) { }

  SaveContact(form:any){
    return this.http.post(this.rootUrl + 'Contact/Send',form)
            .pipe(
              map(res=>res),
              catchError(this.errorHandler)
            );
  }
  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
}
}
