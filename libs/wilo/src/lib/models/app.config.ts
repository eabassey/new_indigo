import {ServerCallConfig, ServerQueryConfig, EventConfig, StateConfig, WhenRule,} from '../models';
import {EventEmitter} from 'events';
import { ActionRule, ReturnRule } from './rule';


export interface AppConfig {
  id?: string;
    name: string;
    description?: string;
    settings?: {
      addActionPanel?: boolean;
      addToolbarActions?: boolean;
      addAppBar?: boolean;
      addFooter?: boolean;
      addAppMenu?: boolean;
      addSearchBanner?: boolean;
      addReminder?: boolean;
    };
    activateGuard?: WhenRule;
    deactivateGuard?: WhenRule;
    appMenu?: ReturnRule<{id: number; name: string; routerLink: string; iconType: string;}[]>;
    startState: string;
    serverCalls?: ServerCallConfig[];
    serverQueries?: ServerQueryConfig[];
    events?: {[name: string]: WhenRule};
    appStates: { [id: string]: StateConfig };
    onAppInit?: ActionRule[];
    onAppDestroy?: ActionRule[];
}
