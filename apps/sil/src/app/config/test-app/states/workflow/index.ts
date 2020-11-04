import {panel1, panel2, panel3, silSearchPanel} from './action-panels';
import { StateConfig } from '@wilo';
import { WorkflowListComponent } from 'apps/sil/src/app/components/workflow/workflow-list.component';
import { map } from 'rxjs/operators';
import * as TP from '@indigo/templates';


export const workflow: StateConfig = {
    id: 'workflow',
    name: 'Workflow',
    title: {template: 'Workfloww'},
    startNode: 'list',
    nodes: {
        list: {
          component: WorkflowListComponent,
          inputs: {
              // list$: 'dyn.variables.claims.dataset'
              // list$: {
              //     variableName: 'claims',
              //     filterFunctions: {filter_down: (id) => p => p.id < id, filter_top: (id) => p => p.id > id}
              // },
              claims$: {
                  variableName: 'claims',
                  filterFunctions: {filter_down: (id) => p => p.id < id, filter_top: (id) => p => p.id > id}
              }
          },
          serverCalls: [
              {
                  key: 'claims',
                  errorMessage: '',
                  filterable: true,
                  sortable: false,
                  directCall: (svc, route) => {
                      return svc.http.get(`${svc.baseUrl}v1/staff_action/get_summary/`, {
                          // headers: {'Access-Control-Allow-Origin': 'true'}
                      }).pipe(map((d: any) => d.payload));
                      // return of([])
                      // return svc.http.post('/api/query', {
                      //     backends: [
                      //         {url: 'http://localhost:3000/claimSummary'},
                      //         // {url: 'http://localhost:3000/claimSummary', query: 'payload[0:15]', group: 'payload'}
                      //     ]
                      // }).pipe(map((d: any) => d.payload));
                  },
                  onSuccess: (result, svc, call) => {
                    svc.eventBus.emit('dance', {svc});
                    svc.eventBus.emit('dance');
                  }
              }
          ],
          footerType: 'pagination'
      },
        testNode1: {
          component: {
              children: [
                  {
                      component: TP.Node1Component,
                      inputs: { greeting: 'Hello component'},
                      outputs: {
                          doWork: (ev, sv) => {
                          }
                      }
                  },
                  {component: TP.Node2Component, inputs: {}, outputs: {}},
                  {
                      component: TP.FormRendererComponent,
                      inputs: {
                          formModel: [
                              // new DynamicDatePickerModel({

                              //     id: 'arrivalDate',
                              //     inline: false,
                              //     label: 'Arrival',
                              //     placeholder: 'Date of Arrival'
                              // }),
                              // new DynamicInputModel({

                              //     id: 'sampleInput1',
                              //     label: 'Prove Input',
                              //     maxLength: 42,
                              //     placeholder: 'Proooove'
                              // }),
                          ]
                      },
                      outputs: {}
                  }
              ]
          },
          footerType: 'node_nav',
          navs: [
              // {isPreviousButton: true, text: 'Prev', routerLink: ['../testNode3', {foo: 'zee'}]}
              {text: 'To Node2', routerLink: ['list'], onClick: (ev, inst, svc, route) => inst[0].doWork.emit({ev})},
              {text: 'To Node3', routerLink: ['testNode3', {foo: 'zee'}]}
          ]
      }
    },
    actionPanel: {
      search: silSearchPanel,
      // filter: silFilterPanel,
        panel1,
        panel2,
        panel3
    }
}
