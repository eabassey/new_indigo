import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToolbarControlConfig } from '../models';


@Injectable({providedIn: 'root'})
export class HeaderAccessorService {
    private headerControlsState$ = new BehaviorSubject<ToolbarControlConfig[]>([]);

    setHeaderControls(controls: ToolbarControlConfig[]): void {
        this.headerControlsState$.next(controls);
    }

    get headerControls(): Observable<ToolbarControlConfig[]> {
        return this.headerControlsState$.asObservable();
    }
}
