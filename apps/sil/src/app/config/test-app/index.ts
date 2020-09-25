import { of } from 'rxjs';
import { testState1 } from './states/test-state1';
import { workflow} from './states/workflow';
import { AppConfig } from '@wilo';
import {SIL_27} from './states/sil-27';
import { AuthGuard } from '@indigo/identity';
import { filter, map } from 'rxjs/operators';
import { createClaim} from './states/createClaim';


export const testApp: AppConfig = {
    name: 'test-app',
    appMenu: ({ auth }) => {
      return auth.getUser().pipe(
        filter(user => !!user),
        map((currentUser: any) => {
          console.log({currentUser})
          const createRoles = [1, 6, 18];
        const menuItems = [{ id: 1, name: 'Workflow', routerLink: '/testApp/workflow/list', iconType: 'app-menu-workflow' }];

        if (currentUser && currentUser.user && currentUser.user.roles.some(role => createRoles.includes(role))) {
          menuItems.push({ id: 2, name: 'New Claim', routerLink: '/testApp/createClaim/policyLookup', iconType: 'app-menu-new-claim' });
        }

        return menuItems;
        })
      );
    },
    canActivate: [AuthGuard],
    startState: 'workflow',
    onAppInit: (svc) => {
      // svc.listeners.emit('dance');
    },
    appStates: {
        createClaim,
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
    ],
    eventListeners: (evt) => {
      evt.on('dance', (data) => console.log('dancing through it all', data))
    }
}
