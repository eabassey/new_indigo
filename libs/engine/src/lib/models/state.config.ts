import { CoreServices } from '../services';
import { ToolbarControlConfig } from './toolbar-control.config';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionPanelConfig } from './action-panel.config';
import { ServerCallConfig } from './server-call.config';
import { ServerQueryConfig } from './server-query.config';
import { EventConfig } from './event.config';
import { NodeConfig } from './node.config';

export interface StateConfig {
    id: string;
    layout?: {
      showFooter: boolean;
      showHeader: boolean;
      showToolbar: boolean;
      showActionPanel: boolean;
    };
    controls?: (svc: CoreServices) => ToolbarControlConfig[];
    title?: string | ((svc: CoreServices, route?: ActivatedRoute) => Observable<string>);
  
    canActivate?: any[];
    canDeactivate?: any[];
    activateGuard?: (svc: CoreServices, route?: ActivatedRoute) => Observable<boolean>;
    deactivateGuard?: (svc: CoreServices, route?: ActivatedRoute) => Observable<boolean>;
    name: string;
    useMockData?: boolean;
    mockData?: {[key: string]: any};
    actionPanel?: {[id: string]: ActionPanelConfig};
    allowedRoles?: any[];
    serverCalls?: ServerCallConfig[];
    serverQueries?: ServerQueryConfig[];
    events?: {[name: string]: EventConfig};
    setValuesToBigForm?: (svc: CoreServices, route?: ActivatedRoute) => Observable<any>;
    bigFormToStoreMapper?: { [id: string]: string | string[] | [Function, string] | [Function, string][] };
    startNode: string;
    contextMenu?: {
      itemOne: { [id: string]: StateConfig };
      itemTwo: { [id: string]: StateConfig };
    };
    views?: {
      [id: string]: (svc: CoreServices, route?: ActivatedRoute) => { template: any; storeBinding: any };
    };
    nodes?: { [id: string]: NodeConfig };
    onStateInit?: (svc: CoreServices, route?: ActivatedRoute) => void;
    onStateDestroy?: (svc: CoreServices, route?: ActivatedRoute) => void;
    flowErrorMessages?: { [key: string]: string };
  }