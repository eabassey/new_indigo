import { CoreServices } from '../services';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ActionRule, ReturnRule } from './rule';

export interface ServerCallConfig {
    key?: string;
    functionName?: string;
    isBackgroundTask?: boolean;
    ignoreFalseError?: boolean;
    transformResponse?: (data: any) => any;
    timeoutMilliseconds?: number;
    filterable?: boolean;
    sortable?: boolean;
    directCall?: ReturnRule<any>;
    errorMessage: string;
    functionArgs?: any;
    nextNode?: string; // This is set from a nav button, but can also be written to directly if required
    followUpSuccessCalls?: ServerCallConfig[];
    followUpFailCalls?: ServerCallConfig[];
    onSuccess?: ActionRule[];
    onError?: ActionRule[];
    onComplete?: ActionRule[];
  };
