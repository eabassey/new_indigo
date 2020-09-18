import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, empty, of } from 'rxjs';
import { map, tap, catchError, delay, timeout } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { IDENTITY_CONFIG, IdentityConfig, ENVIRONMENT, JWT_TOKEN_KEY } from './constants';
import { Store } from '@ngrx/store';
import { LogOut } from '../store/identity.actions';
// import { ToastrService } from 'ngx-toastr';
import { MsalService } from '@azure/msal-angular';

@Injectable()
export class AuthenticationService {
  headersConfig = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Token ${localStorage.getItem('flexus.web.jwtToken')}`
  };

  api_url: string;

  auth_urls = [];

  constructor(
    private _http: HttpClient,
    @Inject(JWT_TOKEN_KEY) private tokenKey: string,
    @Inject(ENVIRONMENT) private environment: any,
    private router: Router,
    @Inject(IDENTITY_CONFIG) private identityConfig: IdentityConfig,
    private store: Store<any>,
    // private toastr: ToastrService,
    @Optional() private msalService: MsalService
  ) {}

  // Verify JWT in localStorage with server & load user's info
  // This runs once on application startup
  getLoggedInUserFromServer(endpoint: string): Observable<any> {
    if (window.navigator.onLine) {
      if (this.userIsAuthenticated) {
        return this._http.get<{ user: any }>(endpoint).pipe(
          map(currentUser => {
            // this.token = currentUser.user.token;
            return currentUser.user;
          })
        );
      } else {
        console.log(location.href);
        if (!location.href.includes('/azure/callback')) {
          this.store.dispatch(new LogOut());
        }
        return empty();
      }
    } else {
      return empty();
    }
  }

  getLoggedInUserFromServerSilently(endpoint: string): Observable<any> {
    if (window.navigator.onLine) {
      if (this.userIsAuthenticated) {
        return this._http.get<{ user: any }>(endpoint).pipe(
          map(currentUser => {
            // this.token = currentUser.user.token;
            return currentUser.user;
          })
        );
      } else {
        return empty();
      }
    } else {
      return empty();
    }
  }

  login(credentials: { email: string; password: string }): Observable<{ success: boolean; user: any }> {
    if (window.navigator.onLine) {
      const { api_url } = this.environment;
      return this._http
        .post<any>(this.identityConfig.login_endpoint, {
          user: credentials
        })
        .pipe(
          // delay(500000),
          map(data => {
            // this.token = data.user.token;
            return data;
          }),
          timeout(25000)
        );
    } else {
      return of({
        user: null,
        success: false,
        errorMessage: 'You are offline. You can login when online!',
        dataKey: 'offlineUserLogin'
      });
    }
  }

  sendResetLink(email): any {
    return this._http
      .post(this.identityConfig.send_reset_link_endpoint, {
        email
      })
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  logout() {
    localStorage.removeItem('flexus.web.jwtToken');
    switch (localStorage.getItem('flexus.web.authMethod')) {
      case 'azuread': {
        this.msalService.logout();
        break;
      }
      case 'local': {
        this.router.navigate([this.identityConfig.after_logout_url]);
        break;
      }
    }
    localStorage.removeItem('flexus.web.authMethod');
  }

  get userIsAuthenticated(): boolean {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('flexus.web.jwtToken');
    return !!token && !jwtHelper.isTokenExpired(token);
  }


  getTokenExpirationDate(token: string): Date {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.getTokenExpirationDate(token);
  }
}
