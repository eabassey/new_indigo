import { Observable } from 'rxjs';



export interface IAuthService {
    accessToken: string;
    getAccessToken(): Observable<string>;
    getUser(): Observable<any>;
    isAuthenticated(): Observable<boolean>
    logout(): Promise<void>;
}