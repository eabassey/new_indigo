import { of } from 'rxjs';
import { testState1 } from './states/test-state1';
import { workflow} from './states/workflow';
import { AppConfig } from '@wilo';


export const testApp: AppConfig = {
    appKey: 'test',
    appMenu: () => of([]),
    startState: 'workflow',
    appStates: {
        testState1,
        workflow
    },
    serverCalls: [
      {
        key: 'all_info',
        errorMessage: '',
        directCall: ({http, baseUrl}) => {
          return http.get(`${baseUrl}/api/v1/all_info/`);
        }
      }
    ]
}
