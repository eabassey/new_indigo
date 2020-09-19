import { of } from 'rxjs';
import { testState1 } from './states/test-state1';
import { workflow} from './states/workflow';
import { AppConfig } from '@wilo';
import {SIL_27} from './states/sil-27';
import { AuthGuard } from '@indigo/identity';


export const testApp: AppConfig = {
    name: 'test-app',
    appMenu: () => of([]),
    canActivate: [AuthGuard],
    startState: 'workflow',
    appStates: {
        testState1,
        workflow,
        '27': SIL_27
    },
    serverCalls: [
      {
        key: 'all_info',
        errorMessage: '',
        directCall: ({http, baseUrl}) => {
          return http.get(`${baseUrl}v1/all_info/`);
        }
      }
    ]
}
