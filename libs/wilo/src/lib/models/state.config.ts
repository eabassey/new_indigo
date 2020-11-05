import { CoreServices } from '../services';
import { ToolbarControlConfig } from './toolbar-control.config';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionPanelConfig } from './action-panel.config';
import { ServerCallConfig } from './server-call.config';
import { ServerQueryConfig } from './server-query.config';
import { EventConfig } from './event.config';
import { NodeConfig } from './node.config';
import { ActionRule, DoRule, ReturnRule, WhenRule } from './rule';
import { TemplateParser } from './template-parser';

export interface StateConfig {
    id: string;
    name?: string;
    showTabs?: boolean;
    layout?: {
      hideFooter?: boolean;
      hideHeader?: boolean;
      hideToolbar?: boolean;
      hideActionPanel?: boolean;
    };
    controls?: ReturnRule<ToolbarControlConfig[]>;
    title?: TemplateParser;
    instructions?: {
      editRoles: { [id: number]: string };
      viewRoles: { [id: number]: string };
    };
    activateGuard?: WhenRule;
    deactivateGuard?: WhenRule;
    actionPanel?: {[id: string]: ActionPanelConfig};
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
    onStateInit?: ActionRule[];
    onStateDestroy?: ActionRule[];
    flowErrorMessages?: { [key: string]: string };
  }
