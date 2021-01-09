import { Injectable, Inject } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { LogOut } from '../store';
import { IDENTITY_CONFIG, IdentityConfig, JWT_TOKEN_KEY } from './constants';
import { Router } from '@angular/router';
import { CoreServices } from '@wilo';

@Injectable()
export class LocalAuthInterceptorService implements HttpInterceptor {
  headersConfig = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  constructor(
    @Inject(JWT_TOKEN_KEY) private tokenKey: string,
    // private authService: LocalAuthenticationService,
    // @Inject(LOCAL_IDENTITY_CONFIG) private identityConfig: LocalIdentityConfig,
    private router: Router,
    private store: Store<any>,
    private svc: CoreServices
  ) {}

  // getToken(): string {
  //   return localStorage.getItem(this.tokenKey);
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const localHeadersConf: any = { ...this.headersConfig };
    if (
      request.url.includes('/api/v2/auth/login/') ||
      request.url.includes('v1/auth/azure/') ||
      request.url.includes('v1/auth/azure/logout/')
    ) {
      delete localHeadersConf['Authorization'];
       // the bellow should work
       if (request.body instanceof FormData) {
        delete localHeadersConf['Content-Type'];
      }
      let newRequest = request.clone({
        setHeaders: localHeadersConf
      });

      //

      newRequest = request.clone({
        setHeaders: localHeadersConf
      });

      return next.handle(newRequest).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // console.log({ routerURL: this.router.url });
              // if (!this.identityConfig.no_auth_urls.includes(this.router.url) && !this.authService.userIsAuthenticated) {
              //   // this.store.dispatch(new LogOut());
              // }
            }
          },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 403) {
                this.store.dispatch(new LogOut());
              }
            }
          }
        )
      );
    } else {
      const accessToken = localStorage.getItem('flexus.web.jwtToken');
      if (accessToken) {
        localHeadersConf['Authorization'] = `Token ${accessToken}`;
      }
      // the bellow should work
      if (request.body instanceof FormData) {
        delete localHeadersConf['Content-Type'];
      }
      let newRequest = request.clone({
        setHeaders: localHeadersConf
      });

      //

      newRequest = request.clone({
        setHeaders: localHeadersConf
      });

      return next.handle(newRequest).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // console.log({ routerURL: this.router.url });
              // if (!this.identityConfig.no_auth_urls.includes(this.router.url) && !this.authService.userIsAuthenticated) {
              //   // this.store.dispatch(new LogOut());
              // }
            }
          },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 403) {
                this.store.dispatch(new LogOut());
              }
            }
          }
        )
      );
    }
  }
}

export const requestOptionsProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LocalAuthInterceptorService,
  multi: true
};
