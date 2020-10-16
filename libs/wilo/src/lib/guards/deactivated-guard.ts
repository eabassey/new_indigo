import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { CoreServices } from '../services';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class DeactivateGuard implements CanDeactivate<any> {
        constructor(private svc: CoreServices,  private route: ActivatedRoute) {}

        canDeactivate(
            component: any,
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ) {
            const guard = route.data['deactivateGuard'];
            // console.log('In deactivate: ', route.data)
            return guard ? guard(this.svc, this.route) : of(true);
    }
  }
