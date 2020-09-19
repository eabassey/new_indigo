import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { getIsAuthenticated } from '../store';
import { CoreServices } from '@wilo';

@Injectable()
export class NoAuthGuard implements CanActivate {

  constructor(private svc: CoreServices) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.svc.auth.isAuthenticated().pipe(map(authed => !authed));
  }
}
