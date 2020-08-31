import * as TP from '@indigo/templates';
import {of, from} from 'rxjs';


import { NodeConfig } from '@wilo';
import { mergeMap } from 'rxjs/operators';


export const testNode2: NodeConfig = {
    id: 'testNode2',
    component: TP.FormRendererComponent,
    serverQueries: [
        {
            key: 'freeKey',
            endpoint: {
                "backends": [
                    // {
                    //     "url": "https://jsonplaceholder.typicode.com/posts",
                    //     "query": "[0:5].title",
                    //     "group": "sil"
                    // },
                    // {
                    //     "url": "https://jsonplaceholder.typicode.com/posts",
                    //     "query": "[0:5].body",
                    //     "group": "mc"
                    // },
                    // {
                    //     "url": "https://jsonplaceholder.typicode.com/posts",
                    //     "query": "[0:5]",
                    //     "group": "sp"
                    // }
                ]
            }
        }
    ],
    serverCalls: [
        {
            key: 'testCall34',
            errorMessage: '',
            filterable: true,
            sortable: true,
            transformResponse: (data) => {
                return data.filter(d => d.id !== 10);
            },
            directCall: (svc, route) => {
                // return svc.http.get('https://jsonplaceholder.typicode.com/todos', {
                //     headers: {'Access-Control-Allow-Origin': 'true'}
                // });
                return svc.auth.getUser().pipe(
                    mergeMap(user => {
                        console.log({user22: user});
                        return svc.http.get('http://localhost:3333/api/posts', {
                            headers: {'Access-Control-Allow-Origin': 'true'}
                        })
                    })
                );
            },
            onSuccess: (result, svc, call) => {
                // console.log('Callback On Success: Todos', {result, svc, call});
            }
        }
    ],
    inputs: {
        test$: {variableName: 'testCall34', filterFunctions: {by_state: (id) => p => p.id < id, by_state2: (id) => p => p.id > id}},
        formModel: [

            // new DynamicInputModel({

            //     id: 'sampleInput',
            //     label: 'Sample Input',
            //     maxLength: 42,
            //     placeholder: 'Sample input'
            // }),

            // new DynamicRadioGroupModel<string>({

            //     id: 'sampleRadioGroup',
            //     label: 'Sample Radio Group',
            //     options: [
            //         {
            //             label: 'Option 1',
            //             value: 'option-1',
            //         },
            //         {
            //             label: 'Option 2',
            //             value: 'option-2'
            //         },
            //         {
            //             label: 'Option 3',
            //             value: 'option-3'
            //         }
            //     ],
            //     value: 'option-3'
            // }),


            // new DynamicCheckboxModel({

            //     id: 'sampleCheckbox',
            //     label: 'I do agree'
            // })
        ]
    },
    activateGuard: (svc, route) => {
        return of(true);
    },
    footerType: 'node_nav',
    navs: [
        {isPreviousButton: true, color: 'default', text: 'Prev', routerLink: ['../testNode1']},
        {text: 'To Node3', color: 'default', routerLink: ['../testNode3'], visible: () => of(true)},
    ]
}
