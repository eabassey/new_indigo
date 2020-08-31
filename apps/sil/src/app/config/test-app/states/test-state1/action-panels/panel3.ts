import * as TP from '@indigo/templates';
import { ActionPanelConfig } from '@wilo';

export const panel3: ActionPanelConfig = {
    id: 'panel3',
    icon: 'notes',
    instruction: 'showing panel 2',
    startNode: 'node2',
    nodes: {
        node2: {
            id: 'node2',
            component: TP.Node2Component,
        }
    }
};
