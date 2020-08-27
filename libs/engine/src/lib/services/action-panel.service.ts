import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActionPanelConfig } from '../models';

@Injectable({providedIn: 'root'})
export class ActionPanelService {
    panelState = new BehaviorSubject<any[]>([]);

    setActionPanel(actionPanels: ActionPanelConfig[]): void {
        const panels = actionPanels.map(act => ({id: act.id, path: act.id, instruction: act.instruction, icon: act.icon}));
        this.panelState.next(panels);
    }

    get panelActions$(): Observable<any[]> {
        return this.panelState.asObservable();
    }
}