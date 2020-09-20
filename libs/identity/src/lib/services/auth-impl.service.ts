import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { IAuthService } from '@wilo';
import { map, pluck, skipWhile } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthImplService implements IAuthService {

    private userState$ = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('flexus.web.user')) ||  null);
    constructor() {}
    setUser(user) {
      console.log('called user setter')
      this.userState$.next(user);
    }
    private get user$() {
      return this.userState$.asObservable().pipe(
        map(user => {
          console.log({user})
          if (!user) {
            const usr = localStorage.getItem('flexus.web.user');
            return JSON.parse(usr);
          }
          return user;
        })
      );
    }
    getAccessToken(): Observable<string> {
        return this.user$.pipe(
          skipWhile(user => !user),
          pluck('token')
        );
    }
    getUser(): Observable<any> {
        return this.user$;
    }
    isAuthenticated(): Observable<boolean> {
        return this.user$.pipe(
          map(user => !!user)
        );
    }
    logout(): Promise<void> {
        return Promise.resolve();
    }
}
