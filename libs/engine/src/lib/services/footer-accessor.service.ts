import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class FooterAccessorService {
    private activeNodeForFooter$ = new BehaviorSubject<any>(null);
    private compInstances$ = new BehaviorSubject<any>([])
    setNodeForFooter(node): void {
        this.activeNodeForFooter$.next(node);
    }

    get nodeForFooter(): Observable<any> {
        return this.activeNodeForFooter$.asObservable();
    }

    setCompInstances(instances): void {
        this.compInstances$.next(instances);
    }

    get compInstances(): Observable<any> {
        return this.compInstances$.asObservable();
    }
}
