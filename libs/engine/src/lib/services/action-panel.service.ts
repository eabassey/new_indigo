import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActionPanelConfig } from '../models';

@Injectable({providedIn: 'root'})
export class ActionPanelService {
    panelState = new BehaviorSubject<{[id: string]: ActionPanelConfig}>({});

    setActionPanel(actionPanels: {[id: string]: ActionPanelConfig}): void {
        this.panelState.next(actionPanels);
    }

    get panelActions$(): Observable<{[id: string]: ActionPanelConfig}> {
        return this.panelState.asObservable();
    }
}
