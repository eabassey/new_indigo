import { CoreServices } from '../services';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ServerCallConfig } from './server-call.config';
import { ServerQueryConfig } from './server-query.config';
import { StateConfig } from './state.config';
import { EventConfig } from './event.config';
import { FooterButtonConfig } from './footer-button.config';
import { ActionRule, WhenRule } from './rule';
import { TemplateParser } from './template-parser';

export interface NodeConfig {
    name?: string;
    hideTab?: boolean;
    layout?: {
      showFooter?: boolean;
      showHeader?: boolean;
      showToolbar?: boolean;
      showActionPanel?: boolean;
    };
    // prevState?: any;
    controls?: (p) => any;
    activateGuard?: WhenRule;
    deactivateGuard?: WhenRule;
    title?: TemplateParser;
    footerType?: 'pagination' | 'node_nav';

    errorHandler?: {
      displayFormat: 'inline' | 'toast' | 'dialog' | 'none';
      retryPolicy?: 'none' | 'manual' | 'auto' | { retryInterval: number; retryCount: number };
      onRetryComplete?: (svc: CoreServices, route?: ActivatedRoute) => Observable<any>;
    };
    // errorDisplayFormat?: 'inline' | 'toast' | 'dialog';
    initFormFields?: (svc: CoreServices, route?: ActivatedRoute) => void | Subscription;
    checkValidityForFields?: string[];
    nodeType?: 'singleView' | 'decision' | 'subflow';
    mockContextData?: {
      [id: string]: any;
    };
    serverCalls?: ServerCallConfig[];
    serverQueries?: ServerQueryConfig[];
    subFlow?: StateConfig;
    events?: {[name: string]: EventConfig};
    decision?: (svc: CoreServices, route?: ActivatedRoute) => void | Subscription;
    intersectData?: (svc: CoreServices, route?: ActivatedRoute) => void;
    inputs?: { [id: string]: any };
    outputs?: { [id: string]: (ev: any, svc: CoreServices) => void };
    component?: string | TemplateDefinition;
    navs?: FooterButtonConfig[];

    onNodeInit?: ActionRule[];
    onNodeDestroy?: ActionRule[];
  }

export interface TemplateDefinition {
    children: OrganismDefinition[];
    layout?: string;
  }

export interface OrganismDefinition {
    component: string;
    inputs: { [key: string]: any };
    outputs?: { [id: string]: (ev: any, svc: CoreServices) => void };
  }
