import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LimitsGuard implements CanActivate {
  constructor( private auth:AuthenticationService ,private router : Router){}
  isAuth :boolean = true; 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.auth.isAuthenticated()) {
        //this.router.navigate(['login']);
        console.log('You are already connected go buy somethings');
        this.isAuth = true;
        if(this.isAuth){
          console.log('hana')
          return true;    
        }
      }
      console.log('hana222')

        return false;
  }
  
}
