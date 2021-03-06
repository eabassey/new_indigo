import { Injectable } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, switchMap, skipWhile, take } from 'rxjs/operators';
import { CoreServices } from '@wilo';


// @Injectable({providedIn: 'root'})
export class Interceptor implements HttpInterceptor {

  constructor(public svc: CoreServices) {}
   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

       return this.svc.auth.getAccessToken().pipe(
           switchMap(accessToken => {
            const newRequest = request.clone({
                setHeaders: {
                  Authorization: 'Bearer ' + accessToken,
                }
              });
              return next.handle(newRequest);
           })
       )
  }
}

export const requestOptionsProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
  };
