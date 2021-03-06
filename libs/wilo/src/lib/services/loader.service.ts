import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, tap, delay } from 'rxjs/operators';
import {remove} from 'lodash';

@Injectable({providedIn: 'root'})
export class LoaderService {
    private tracker: string[] = [];
    private loader$ = new BehaviorSubject<any>(this.tracker);

    get loading$() {
        return this.loader$.asObservable().pipe(map(tr => !!tr.length), delay(0));
    }

    add(loaderId: string) {
        this.tracker.push(loaderId);
        this.loader$.next(this.tracker);
    }

    remove(loaderId: string) {
        remove(this.tracker, (n: string) => n === loaderId);
        this.loader$.next(this.tracker);
    }
}
