import { Observable } from 'rxjs';



export interface IAuthService {
    setUser(user): void;
    getAccessToken(): Observable<string>;
    getUser(): Observable<any>;
    isAuthenticated(): Observable<boolean>
    logout(): Promise<void>;
}
