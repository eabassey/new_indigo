import {  addFilter, resetFilter, ActionPanelConfig } from '@wilo';
import * as TP from '@indigo/templates';

export const silSearchPanel: ActionPanelConfig = {
    id: 'search',
    icon: 'search',
    instruction: 'Search',
    startNode: 'search',
    nodes: {
        search: {
            component: TP.SearchComponent,
            outputs: {
                doWork: (ev, sv) => {
                },
                setFilter: (ev, svc) => {
                    svc.store.dispatch(addFilter({key: 'claims', filter: ev}));
                },
                resetFilter: (ev, svc) => {
                    svc.store.dispatch(resetFilter({key: 'claims'}));
                }
            },
            serverCalls: [

            ],
            footerType: 'none'
        }
    }
}
