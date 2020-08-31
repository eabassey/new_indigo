import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { IAuthService } from '@wilo';

@Injectable({providedIn: 'root'})
export class AuthImplService implements IAuthService {
    accessToken: string;
    constructor() {}
    getAccessToken(): Observable<string> {
        return of('');
    }
    getUser(): Observable<any> {
        return from([]);
    }
    isAuthenticated(): Observable<boolean> {
        return of(true)
    }
    logout(): Promise<void> {
        return Promise.resolve();
    }
}
