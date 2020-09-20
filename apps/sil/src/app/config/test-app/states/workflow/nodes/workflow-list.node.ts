import * as TP from '@indigo/templates';
import { NodeConfig } from '@wilo';
import { WorkflowListComponent } from 'apps/sil/src/app/components/workflow/workflow-list.component';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';



export const mainListNode: NodeConfig = {
    component: WorkflowListComponent,
    inputs: {
        // list$: 'dyn.variables.claims.dataset'
        // list$: {
        //     variableName: 'claims',
        //     filterFunctions: {by_state: (id) => p => p.id < id, by_state2: (id) => p => p.id > id}
        // },
        claims$: {
            variableName: 'claims',
            // filterFunctions: {by_state: (id) => p => !!p.id}
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
              console.log('kiccking again aaaa')
              svc.eventBus.emit('dance', {svc});
              svc.eventBus.emit('dance');
                // console.log('Callback On Success: Todos', {result, svc, call});
            }
        }
    ],
    footerType: 'pagination'
}
