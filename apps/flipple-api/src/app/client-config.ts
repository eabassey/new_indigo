import * as express from 'express';
import {AppConfig, ClientConfig} from '@wilo';

const router = express.Router();


router.get('/', (req, res) => {
  const config: ClientConfig = {
    name: 'FNB Bank',
    startApp: 'testApp',
    apps: {
      testApp: {
        name: 'test-app',
        appMenu: {
          whenRule: {
            predicates: [
              {using: 'auth.getUser', resultQuery: 'user.roles', operator: 'containsAny', valueComparer: [1, 6, 18]}
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
        appStates: {
          workflow: {
            id: 'workflow',
            name: 'Workflow',
            title: {template: 'Workfloww'},
            startNode: 'list',
            nodes: {
              list: {
                component: 'WorkflowListComponent',
              }
            }
          }
        }
      },
    }
  };
  res.json(config)
})


export default router;
