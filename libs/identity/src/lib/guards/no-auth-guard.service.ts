import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { getIsAuthenticated } from '../store';

@Injectable()
export class NoAuthGuard implements CanActivate {
  authenticated$: Observable<boolean>;

  constructor(private _store: Store<any>) {
    this.authenticated$ = _store.select(getIsAuthenticated);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authenticated$.pipe(map(bool => !bool));
  }
}
