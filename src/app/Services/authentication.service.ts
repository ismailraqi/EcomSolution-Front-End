import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public apiURL:string="http://localhost:51603";

  constructor(private httpClient:HttpClient) { }
  
   ValidateUser (user:any)
   {
     var userData = "username=" + user.UserName + "&password=" + user.Password + "&grant_type=password";
     var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','No-Auth':'True' });
 
     return this.httpClient.post(this.apiURL+ '/token',userData,{ headers: reqHeader })
     .pipe(
       map(res => res),
        catchError( this.errorHandler)
       );
   }
   getClaims ()
   {
     var reqHeader = new HttpHeaders({ 'Authorization':'Bearer '+this.getToken()});
         reqHeader.append('Content-Type', 'application/json');
     return this.httpClient.get(this.apiURL+ '/api/Account/GetUserClaims',{ headers: reqHeader })
     .pipe(
       map(res => res),
        catchError( this.errorHandler)
       );
   }
   public isAuthenticated(): boolean {
     return this.getToken() !== null;
   }
   storeToken(token: string) {
     localStorage.setItem("token", token);
   }
   getToken() {
     return localStorage.getItem("token");
   }
   removeToken() {
     return localStorage.removeItem("token");
   }
   storeRole(role: any) {
     this.removeRole();
     localStorage.setItem('role', JSON.stringify(role));
   }
   getRole() {
     // return localStorage.getItem("role");
     return JSON.parse(localStorage.getItem('role'));
   }
   removeRole() {
     return localStorage.removeItem("role");
   }
   errorHandler(error: Response) {  
     console.log(error);  
     return throwError(error);  
 }
}
