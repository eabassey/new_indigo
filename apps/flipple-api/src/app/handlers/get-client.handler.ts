import { ClientConfig } from '@wilo';


export const getClientHandler = db => (req, res) => {
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
                              {buttonText: 'Logger', onClick: [{type: 'do', using: 'console.log', withArgs: ['Logging now...', 'Hello there', {key: 'claims', filterKey: 'filter_top_by_10'}]}]},
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
                    component: 'WorkflowList',
                    inputs: {
                        todos: ['dance', 'eat', 'dream'],
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
                            },
                            // transformResponse: {
                            //   // parentPath: 'payload',
                            //   parentMapper: {
                            //     'applicant.first_name': 'first_name',
                            //     'applicant.id_number': 'id_number'
                            //   },
                            //   childMappers: [
                            //     {
                            //       path: 'jobs',
                            //       mapper: {
                            //         id: 'id',
                            //         'appointment.range_start': 'start_time'
                            //       }
                            //     }
                            //   ]
                            // }
                        }
                    ],
                    footerType: 'pagination'
                },
              },

          },
          27: {
            id: '27',
            name: 'job-invoiced',
            title: {template: 'Job Invoicing'},
            startNode: 'node1',
            // activateGuard: ({clientConfig}) => {
            //   return of(clientConfig.startApp === 't');
            // },
            // activateGuard: {
            //   type: 'when',
            //   predicates: [
            //     {using: 'localStorage.getItem', withArgs: ['flexus.web.authMethod'], operator: 'equals', valueComparer: 'local'}
            //     // {using: 'localStorage.getItem', withArgs: ['flexus.web.user'], operator: 'equals', resultQuery: 'email', valueComparer: 'VBCH.'}
            //     // {using: 'indexedDb.contacts.get', withArgs: [1], operator: 'equals', valueComparer: undefined}
            //     // {using: 'bf.bigForm.valid', operator: 'equals', valueComparer: true}
            //     // {using: 'http.get', withArgs: ['https://jsonplaceholder.typicode.com/posts'], operator: 'hasLength', valueComparer: 100}
            //     // {using: 'clientConfig.startApp', operator: 'equals', valueComparer: 'testAppe'}
            //   ],
            // },
            events: {

            },
            nodes: {
              node1: {
                component: {
                  children:[
                    {component: 'Node1Component', inputs: {}},
                    {
                      component: 'FormBuilderComponent',
                      inputs: {
                        formModel: {
                          fields: [
                            {type: 'text', label: 'First Name', name: 'firstName', value: '', controlClasses:"test", validators: [{type: 'required', errorMessage :"Please give first name"}, {type: 'minlength', arg: 5}]},
                            {type: 'text', label: 'Last Name', name: 'lastName', value: ''},
                            {type: 'textarea', label: 'Address', name: 'address', value: '', placeholder : '', rows: 4, cols: 20},
                            {type: 'checkbox', name: 'gender', options: [{label: 'Male', key: 'male'}, {label: 'Female', key: 'female'}]}
                          ]
                        }
                      }
                    },
                    {component: 'Node1Component', inputs: {}},
                  ]
                },
                navs: [
                  {text: 'To Workflow',
                  // onClick: (svc) => {
                  //   const url = svc.keyValueStore.getItem('workflowURL');
                  //   svc.router.navigateByUrl(url);
                  // },
                  location: 'left'
                },
                  {text: 'To Node 22', routerLink: ['node2'], location: 'right'}
                ],
                footerType: 'node_nav'
              },
              node2: {
                component: {
                  children:[
                    {component: 'Node1Component', inputs: {}},
                    {
                      component: 'FormBuilderComponent',
                      inputs: {
                        formModel: {
                          fields: [
                            {type: 'text', label: 'First Name', name: 'firstName', value: '', validators: [{type: 'required', errorMessage :"Please give first name"}, {type: 'minLength', arg: 5}]},
                          ]
                        }
                      }
                    },
                    {component: 'Node1Component', inputs: {}},
                  ]
                },
                navs: [
                  {text: 'Back To Node 1', routerLink: ['./node1'], location: 'right'}
                ],
                footerType: 'node_nav'
              },
              MiscellaneousClass: {
                name: 'miscellaneous-class',
                nodeType: 'decision',
              }
            },
            bigFormToStoreMapper: {

            }
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

  // Get the documents collection
    // const collection = db.collection(req.params.clientId);
    // // Find some documents
    // collection.find({_id: '5fb58d7aa60b56cc64fa24ca'}).toArray(function(err, docs) {
    //   console.log("Found the following records");
    //   console.log(docs)
    //   res.json(docs);
    // });
};
