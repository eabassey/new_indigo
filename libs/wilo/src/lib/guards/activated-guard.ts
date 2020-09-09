import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoreServices } from '../services/core.services';
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class ActivatedGuard implements CanActivate {
    constructor(private svc: CoreServices,  private route: ActivatedRoute) {}
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
          const guard = next.data['activateGuard'];
          // console.log('In guard: ', next.data);
          return guard ? guard(this.svc, this.route) : of(true);
    }
  }
