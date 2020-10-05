import { ActivatedRoute } from '@angular/router';
import { CoreServices } from '../services';
import { ServerCallConfig } from './server-call.config';

export interface EventConfig {
    triggerOn: string[];
      triggerWhen: (...prop: any) => boolean;
      dataMutations: (svc: CoreServices, route?: ActivatedRoute) => void;
      serverCalls?: ServerCallConfig[];
}
