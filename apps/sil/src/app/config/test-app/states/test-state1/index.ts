import { StateConfig} from '@wilo';
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {panel1, panel2, panel3} from './action-panels';
import {testNode1, testNode2, testNode3} from './nodes';


export const testState1: StateConfig = {
    id: 'testState1',
    name: 'Test State',
    startNode: 'testNode1',
    controls: (svc) => {
        return [
            {
                id: 5,
                type: 'standalone',
                icon: 'sorting-down', // data.params.reverse ? 'sorting-up' : 'sorting-down',
                instruction: 'Newest to Oldest', // data.params.reverse ? 'Oldest to Newest' : 'Newest to Oldest',
                command: () => {
                    console.log('doing something !!', {svc})
                }
            },
            {
                id: 6,
                type: 'standalone',
                icon: 'app-menu-logout',
                instruction: 'Log Out',
                command: () => {
                    console.log('logged out user!!');
                    svc.auth.logout();
                }
            }
            // {
            // id: 4,
            // type: 'dropdown',
            // children: [
            //     {
            //     text: 'Details View',
            //     // command: instance.loadDetailsView.bind(instance)
            //     },
            //     {
            //     text: 'List View',
            //     // command: instance.loadListView.bind(instance)
            //     }
            // ]
            // }
        ];
    },
    setValuesToBigForm: ({bf}) => {
        return of({}).pipe(
            tap(() => {
                // bf.bigForm.patchValue({sampleInput1: 'Taste and see the LORD is good'});
            })
        );
    },
    activateGuard: (svc, route) => {
        return of(true);
    },
    actionPanel: {
        panel1,
        panel2,
        panel3
    },
    serverCalls: [
        {
            key: 'testCall8',
            errorMessage: '',
            directCall: (svc, route) => {
                return svc.http.get('https://jsonplaceholder.typicode.com/posts');
            },
            onSuccess: (result, svc, call) => {
                // console.log('Callback On Success: Posts', {result, svc, call});
            }
        }
    ],
    nodes: {
        testNode1,
        testNode2,
        testNode3
    }
}
