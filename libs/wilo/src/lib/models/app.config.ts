import {CoreServices} from '../services';
import {ServerCallConfig, ServerQueryConfig, EventConfig, StateConfig,} from '../models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {EventEmitter} from 'events';


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
    activateGuard?: (svc: CoreServices, route?: ActivatedRoute) => Observable<boolean>;
    canActivate?: any[],
    canDeactivate?: any[],
    deactivateGuard?: (svc: CoreServices, route?: ActivatedRoute) => Observable<boolean>;
    appMenu: (svc: CoreServices, route?: ActivatedRoute) => Observable<any[]>;
  //   virtualStatesFunction?: Function;
  //   appSearch: SearchFunc_0_0_2;
    controls?: (p) => any;
    startState: string;
    serverCalls?: ServerCallConfig[];
    serverQueries?: ServerQueryConfig[];
    events?: {[name: string]: EventConfig};
    appStates: { [id: string]: StateConfig };
    onAppInit?: (svc: CoreServices, route?: ActivatedRoute) => void;
    onAppDestroy?: (svc: CoreServices, route?: ActivatedRoute) => void;
    eventListeners?: (ev: EventEmitter) => void;
}
