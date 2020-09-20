import {  addFilter, resetFilter, ActionPanelConfig } from '@wilo';
import * as TP from '@indigo/templates';

export const panel1: ActionPanelConfig = {
    id: 'panel1',
    icon: 'bucket',
    instruction: 'showing panel 1',
    startNode: 'node1',
    nodes: {
        node1: {
            component: TP.Node1Component,
            outputs: {
                doWork: (ev, sv) => {
                    // console.log('Panel Event: ', {ev})
                },
                setFilter: (ev, svc) => {
                    svc.store.dispatch(addFilter({key: 'claims', filter: ev}));
                },
                resetFilter: (ev, svc) => {
                    svc.store.dispatch(resetFilter({key: 'claims'}));
                }
            },
            serverCalls: [
                {
                    key: 'testCall7',
                    errorMessage: '',
                    directCall: (svc, route) => {
                      console.log('helo hello hellllo')
                        return svc.http.get('https://jsonplaceholder.typicode.com/posts');
                    },
                    onSuccess: (result, svc, call) => {
                        // console.log('Callback On Success:Panel Posts', {result, svc, call});
                    },
                    followUpSuccessCalls: [
                        {
                            key: 'testFollowup',
                            errorMessage: '',
                            directCall: (svc, route) => {
                                return svc.http.get('https://jsonplaceholder.typicode.com/posts');
                            },
                            onSuccess: (result, svc, call) => {
                                // console.log('Callback On Success:Panel Posts FollowupXX', {result, svc, call});
                            }
                        }
                    ]
                }
            ],
        }
    }
}
