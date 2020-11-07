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
            workflow: {
              id: 'workflow',
              name: 'Workflow',
              title: {template: 'Workflowwer'},
              startNode: 'list',
              nodes: {
                  list: {
                    component: 'WorkflowListComponent',
                    inputs: {
                        // list$: 'dyn.variables.claims.dataset'
                        // list$: {
                        //     variableName: 'claims',
                        //     filterFunctions: {filter_down: (id) => p => p.id < id, filter_top: (id) => p => p.id > id}
                        // },
                        claims$: {
                            variableName: 'claims',
                            // filterFunctions: {filter_down: (id) => p => p.id < id, filter_top: (id) => p => p.id > id}
                        }
                    },
                    serverCalls: [
                        {
                            key: 'claims',
                            errorMessage: '',
                            // filterable: true,
                            // sortable: false,
                            directCall: {
                              type: 'single_return',
                              isFunc: true,
                              using: 'http.get',
                              withArgs: ['https://sildev.4-sure.net:10000/api/v1/staff_action/get_summary/'],
                              resultQuery: 'payload'
                            }
                        }
                    ],
                    footerType: 'pagination'
                },
              },

          }
        },
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
    }
  };

  res.json(config);
})


export default router;
