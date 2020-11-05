import { CoreServices } from '../services';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ToolbarControlConfig } from './toolbar-control.config';
import { ServerCallConfig } from './server-call.config';
import { ServerQueryConfig } from './server-query.config';
import { EventConfig } from './event.config';
import { NodeConfig } from './node.config';
import { ActionRule, WhenRule } from './rule';
import { TemplateParser } from './template-parser';

export interface ActionPanelConfig {
    id?: string;
    name?: string;
    icon?: string;
    instruction?: string;
    title?: TemplateParser;
    controls?: (svc: CoreServices, route?: ActivatedRoute) => ToolbarControlConfig[];
    activateGuard?: WhenRule;
    deactivateGuard?: WhenRule;

    initFormFields?: (svc: CoreServices, route?: ActivatedRoute) => void | Subscription;
    checkValidityForFields?: string[];

    serverCalls?: ServerCallConfig[];
    serverQueries?: ServerQueryConfig[];
    events?: {[name: string]: EventConfig};
    setValuesToBigForm?: (svc: CoreServices, route?: ActivatedRoute) => Observable<any>;
    startNode: string;
    nodes?: { [id: string]: NodeConfig };
    onPanelInit?: ActionRule[];
    onPanelDestroy?: ActionRule[];

  }
