import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class FooterAccessorService {
    private currentPageState$ = new BehaviorSubject<any>(1);
    private activeNodeForFooter$ = new BehaviorSubject<any>(null);
    private compInstances$ = new BehaviorSubject<any>([])
    setPage(num: number): void {
        this.currentPageState$.next(num);
    }

    get currentPage(): Observable<number> {
        return this.currentPageState$.asObservable();
    }

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