import {CoreServices} from '../services';
import {ServerCallConfig, ServerQueryConfig, EventConfig, StateConfig, ToolbarControlConfig, WhenRule,} from '../models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {EventEmitter} from 'events';
import { ConditionalReturnRule, ReturnRule } from './rule';


export interface AppConfig {
    name: string;
    settings?: {
      addActionPanel?: boolean;
      addHeaderActions?: boolean;
      addAppBar?: boolean;
      addFooter?: boolean;
      addAppMenu?: boolean;
      addSearchBanner?: boolean;
      addReminder?: boolean;
    };
    activateGuard?: WhenRule;
    deactivateGuard?: WhenRule;
    appMenu?: ReturnRule;
    startState: string;
    serverCalls?: ServerCallConfig[];
    serverQueries?: ServerQueryConfig[];
    events?: {[name: string]: EventConfig};
    appStates: { [id: string]: StateConfig };
    onAppInit?: (svc: CoreServices, route?: ActivatedRoute) => void;
    onAppDestroy?: (svc: CoreServices, route?: ActivatedRoute) => void;
    eventListeners?: (ev: EventEmitter) => void;
}
