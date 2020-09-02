import {mainListNode, testNode1} from './nodes';
import {panel1, panel2, panel3, silSearchPanel} from './action-panels';
import { StateConfig } from '@wilo';

export const workflow: StateConfig = {
    id: 'workflow',
    name: 'Workflow',
    startNode: 'list',
    nodes: {
        list: mainListNode,
        testNode1
    },
    actionPanel: {
      search: silSearchPanel,
        panel1,
        panel2,
        panel3
    }
}
