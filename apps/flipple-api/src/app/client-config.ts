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
              actionPanel: {
                panel1: {
                  id: 'panel1',
                  icon: 'bucket',
                  instruction: 'showing panel 1',
                  startNode: 'node1',
                  nodes: {
                      node1: {
                          component: 'Node1Component',
                          inputs: {
                            greetings: "Hellow component",
                            filterButtons: [
                              {buttonText: 'Filterrr Top', onClick: [{type: 'do', using: 'actions.addFilter', withArgs: [{key: 'claims', filterKey: 'filter_top_by_10'}]}]},
                              {buttonText: 'Reset Filter', onClick: [{type: 'do', using: 'actions.resetFilter', withArgs: [{key: 'claims'}]}]},
                              {buttonText: 'Remove Filter', onClick: [{type: 'do', using: 'actions.removeFilter', withArgs: [{key: 'claims', filterKey: 'filter_top_by_10'}]}]}
                            ]
                          },
                          // outputs: {

                          //     // doWork: (ev, sv) => {
                          //     // },
                          //     // setFilter: (ev, svc) => {svc.
                          //     //     svc.store.dispatch(addFilter({key: 'claims', filter: ev}));
                          //     // },
                          //     // resetFilter: (ev, svc) => {
                          //     //     svc.store.dispatch(resetFilter({key: 'claims'}));
                          //     // }
                          // },
                      }
                  }
              }
              },
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
                            filterCriteria: {filter_down_by_5: {id: {$lt: 5}}, filter_top_by_10: {state: 17}}
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
