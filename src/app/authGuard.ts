import { LoginService } from './login/Login.service';
import { map } from 'rxjs/operators';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/Reducers/Appreducer';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //return this.router.createUrlTree(['']);
    if (localStorage.getItem('username')) {
      return true;
    } else {
      return this.router.createUrlTree(['']);
    }
    // this.store
    //   .select('auth')
    //   .pipe(
    //     map((authstate) => {
    //       if (authstate.username) {
    //         return true;
    //       } else {
    //         return this.router.createUrlTree(['/']);
    //       }
    //     })
    //   )
    //   .subscribe();
  }
}
