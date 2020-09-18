import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { IAuthService } from '@wilo';
import { map, pluck, skipWhile } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthImplService implements IAuthService {

    private userState$ = new BehaviorSubject<any>(null);
    constructor() {}
    setUser(user) {
      this.userState$.next(user);
    }
    private get user$() {
      return this.userState$.asObservable();
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
