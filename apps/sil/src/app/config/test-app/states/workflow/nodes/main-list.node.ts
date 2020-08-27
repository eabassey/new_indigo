import * as TP from '@indigo/templates';
import { NodeConfig } from '@indigo/engine';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';



export const mainListNode: NodeConfig = {
    id: 'main-list',
    component: TP.MainListComponent,
    inputs: {
        // list$: 'dyn.variables.claims.dataset'
        // list$: {
        //     variableName: 'claims',
        //     filterFunctions: {by_state: (id) => p => p.id < id, by_state2: (id) => p => p.id > id}
        // },
        list$: {
            variableName: 'claims',
            // filterFunctions: {by_state: (id) => p => !!p.id}
        }
    },
    serverCalls: [
        {
            key: 'claims',
            errorMessage: '',
            filterable: false,
            sortable: false,
            directCall: (svc, route) => {
                return svc.http.get('http://localhost:3000/claimSummary', {
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
                // console.log('Callback On Success: Todos', {result, svc, call});
            }
        }
    ],
    footerType: 'pagination'
}
