import {ServerCallConfig, ServerQueryConfig, EventConfig, StateConfig, WhenRule,} from '../models';
import {EventEmitter} from 'events';
import { ActionRule, ReturnRule } from './rule';


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
    onAppInit?: ActionRule[];
    onAppDestroy?: ActionRule[];
    eventListeners?: (ev: EventEmitter) => void;
}
