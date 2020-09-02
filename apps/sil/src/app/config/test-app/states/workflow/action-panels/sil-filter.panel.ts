// import {  addFilter, resetFilter, ActionPanelConfig } from '@wilo';
// import * as TP from '@indigo/templates';

// export const silFilterPanel: ActionPanelConfig = {
//     id: 'filter',
//     icon: 'filter-funnel',
//     instruction: 'Filter',
//     startNode: 'filter',
//     nodes: {
//         filter: {
//             id: 'filter',
//             component: TP.SearchFilterComponent,
//             outputs: {
//                 doWork: (ev, sv) => {
//                     // console.log('Panel Event: ', {ev})
//                 },
//                 setFilter: (ev, svc) => {
//                     svc.store.dispatch(addFilter({key: 'claims', filter: ev}));
//                 },
//                 resetFilter: (ev, svc) => {
//                     svc.store.dispatch(resetFilter({key: 'claims'}));
//                 }
//             },
//             serverCalls: [

//             ],
//         }
//     }
// }
