import { CoreServices } from '../services';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ServerCallConfig } from './server-call.config';
import { ServerQueryConfig } from './server-query.config';
import { StateConfig } from './state.config';
import { EventConfig } from './event.config';
import { Type } from '@angular/core';
import { FooterButtonConfig } from './footer-button.config';

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
    canActivate?: any[];
    canDeactivate?: any[];
    activateGuard?: (svc: CoreServices, route?: ActivatedRoute) => Observable<boolean>;
    deactivateGuard?: (svc: CoreServices, route?: ActivatedRoute) => Observable<boolean>;
    title?: string | ((svc: CoreServices, route?: ActivatedRoute) => Observable<string>);
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
    component?: Type<any> | TemplateDefinition;
    navs?: FooterButtonConfig[];

    onNodeInit?: (svc: CoreServices, route?: ActivatedRoute) => void;
    onNodeDestroy?: (svc: CoreServices, route?: ActivatedRoute) => void;
  }

export interface TemplateDefinition {
    children: OrganismDefinition[];
    layout?: string;
  }

export interface OrganismDefinition {
    component: Type<any>;
    inputs: { [key: string]: any };
    outputs?: { [id: string]: (ev: any, svc: CoreServices) => void };
  }
