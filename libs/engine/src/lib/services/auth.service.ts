import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IAuthService } from './i-auth.service';


@Injectable({providedIn: 'root'}) 
export class AuthService implements IAuthService {
    accessToken: string;
    logout(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getAccessToken(): Observable<string> {
        throw new Error('Method not implemented.');
    }
    getUser(): Observable<any> {
        throw new Error('Method not implemented.');
    }
    isAuthenticated(): Observable<boolean> {
        throw new Error('Method not implemented.');
    }

}