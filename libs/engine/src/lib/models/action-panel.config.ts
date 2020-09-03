import { CoreServices } from '../services';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ToolbarControlConfig } from './toolbar-control.config';
import { ServerCallConfig } from './server-call.config';
import { ServerQueryConfig } from './server-query.config';
import { EventConfig } from './event.config';
import { NodeConfig } from './node.config';

export interface ActionPanelConfig {
    id?: string;
    name?: string;
    icon?: string;
    instruction?: string;
    title?: string | ((svc: CoreServices, route?: ActivatedRoute) => Observable<string>);
    controls?: (svc: CoreServices) => ToolbarControlConfig[];
    canActivate?: any[];
    canDeactivate?: any[];
    activateGuard?: (svc: CoreServices, route?: ActivatedRoute) => Observable<boolean>;
    deactivateGuard?: (svc: CoreServices, route?: ActivatedRoute) => Observable<boolean>;
    useMockData?: boolean;
    mockData?: {[key: string]: any};

    initFormFields?: (svc: CoreServices, route?: ActivatedRoute) => void | Subscription;
    checkValidityForFields?: string[];
    mockContextData?: {
      [id: string]: any;
    };
    serverCalls?: ServerCallConfig[];
    serverQueries?: ServerQueryConfig[];
    events?: {[name: string]: EventConfig};
    setValuesToBigForm?: (svc: CoreServices, route?: ActivatedRoute) => Observable<any>;
    startNode: string;
    nodes?: { [id: string]: NodeConfig };
    onPanelInit?: (svc: CoreServices, route?: ActivatedRoute) => void;
    onPanelDestroy?: (svc: CoreServices, route?: ActivatedRoute) => void;

  }
