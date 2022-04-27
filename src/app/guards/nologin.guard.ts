import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {
  constructor(private auth:AngularFireAuth, private router:Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.authState.pipe(map(auth=> {
        if(auth === undefined || auth === null){
          return true;
        }else{
          this.router.navigate(['/home']);
          return false;
        }
      }));
  }

}
