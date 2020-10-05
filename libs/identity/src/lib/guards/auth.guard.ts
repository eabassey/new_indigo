import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { getIsAuthenticated } from '../store';
import { JWT_TOKEN_KEY } from '../services/constants';
import { CoreServices } from '@wilo';
// import { CloseAppMenu } from '@flexus/ux';

@Injectable()
export class AuthGuard implements CanActivate {
  authenticated$: Observable<boolean>;

  constructor(private _router: Router, private svc: CoreServices) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.svc.auth.getUser().pipe(
      map(authed => {
        if (!authed) {
          this._router.navigate(['/auth/login']);
          return false;
        }
        return true
      })
    )
    // if (localStorage.getItem(this.tokenKey)) {
    //   // this._store.dispatch(new CloseAppMenu());
    //   return this.authenticated$.pipe(map(bool => bool));
    // } else {
    //   // location.replace(`${location.origin}/auth/login`);
    //   return of(false);
    // }
  }
}
