import { ActionPanelConfig } from '@indigo/engine';
import * as TP from '@indigo/templates';

export const panel2: ActionPanelConfig = {
    id: 'panel2',
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
