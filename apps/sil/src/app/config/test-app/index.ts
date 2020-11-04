import { of } from 'rxjs';
import { workflow} from './states/workflow';
import { AppConfig } from '@wilo';
import {SIL_27} from './states/sil-27';
import { AuthGuard } from '@indigo/identity';
import { filter, map } from 'rxjs/operators';
import { createClaim} from './states/createClaim';


export const testApp: AppConfig = {
    name: 'test-app',
    appMenu: {
      whenRule: {
        predicates: [
          {isFunc: true, using: 'auth.getUser', resultQuery: 'user.roles', operator: 'containsAny', valueComparer: [1, 6, 18]}
        ]
      },
      thenReturn: [
        { id: 1, name: 'Workflow', routerLink: '/testApp/workflow/list', iconType: 'app-menu-workflow' },
        { id: 2, name: 'New Claim', routerLink: '/testApp/createClaim/policyLookup', iconType: 'app-menu-new-claim' }
      ],
      elseReturn: [
        { id: 1, name: 'Workflow', routerLink: '/testApp/workflow/list', iconType: 'app-menu-workflow' },
      ]
    },
    startState: 'workflow',
    onAppInit: (svc) => {
      // svc.listeners.emit('dance');
    },
    appStates: {
        createClaim,
        workflow,
        '27': SIL_27
    },
    serverQueries: [
      // {
      //   key: 'all_info2',
      //   endpoint: {
      //     backends: [
      //       {
      //         url: `https://sildev.4-sure.net:10000/api/v1/all_info/`,
      //         group: 'data',
      //         query: `$filter(skills, function ($b) {
      //                 $b.id <= 10
      //               })`
      //       }
      //     ]
      //   }
      // }
    ],
    serverCalls: [
      {
        key: 'all_info',
        errorMessage: '',
        directCall: ({http, baseUrl}) => {
          return http.get(`${baseUrl}v1/all_info/`);
        }
      }
    ],
    eventListeners: (evt) => {
      evt.on('dance', (data) => console.log('dancing through it all', data))
    }
}
