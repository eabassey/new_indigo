import { ActivatedRoute } from '@angular/router';
import { CoreServices } from '../services';
import { ActionRule, PredicateOperator } from './rule';
import { ServerCallConfig } from './server-call.config';

export interface EventConfig {
    triggerOn: string[];
      triggerWhen: (...prop: any) => boolean;
      dataMutations: (svc: CoreServices, route?: ActivatedRoute) => void;
      serverCalls?: ServerCallConfig[];
}


// export interface EventConfig {
//   triggerOn: string[];
//     triggerWhen: {
//       key: string;
//       operator: PredicateOperator,
//       valueComparer: any;
//     }[];
//     dataMutations: ActionRule[];
//     serverCalls?: ServerCallConfig[];
// }
