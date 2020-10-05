import { CoreServices } from '../services';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export interface ServerCallConfig {
    key?: string;
    functionName?: string;
    isBackgroundTask?: boolean;
    ignoreFalseError?: boolean;
    transformResponse?: (data: any) => any;
    timeoutMilliseconds?: number;
    filterable?: boolean;
    sortable?: boolean;
    // loaderID?: string;
    directCall?: (svc: CoreServices, route?: ActivatedRoute) => Observable<any>;
    errorMessage: string;
    functionArgs?: any;
    nextNode?: string; // This is set from a nav button, but can also be written to directly if required
    followUpSuccessCalls?: ServerCallConfig[];
    followUpFailCalls?: ServerCallConfig[];
    onSuccess?: (result: any, svc?: CoreServices, serverCall?: ServerCallConfig) => void;
    onError?: (err: any, svc?: CoreServices) => void;
    onComplete?: (svc?: CoreServices) => void;
  };
