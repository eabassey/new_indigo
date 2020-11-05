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
      type: 'conditional_return',
      whenRule: {
        type: 'when',
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
    onAppInit: [
      {
        type: 'do',
        using: 'eventBus.emit', //svc.eventBus.emit('dance')
        withArgs: ['dance', 'lighter']
      },
      {
        type: 'do',
        using: 'eventBus.emit', //svc.eventBus.emit('dance')
        withArgs: ['dance', 'brown']
      }
    ],
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
        directCall: {
          type: 'single_return',
          isFunc: true,
          using: 'http.get',
          withArgs: [`https://sildev.4-sure.net:10000/api/v1/all_info/`]
        }
      }
    ]
}
