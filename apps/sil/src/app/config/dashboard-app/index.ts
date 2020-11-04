import { AppConfig } from '@wilo';
import * as TP from '@indigo/templates';


export const dashboardApp: AppConfig = {
  name: 'dashboard-app',
  startState: 'report',
  appStates: {
    'report': {
      id: 'report',
      name: 'Report',
      title: {template: 'Report'},
      layout: {
        hideFooter: true,
      },
      startNode: 'operations',
      nodes: {
        'operations': {
          component: TP.Node2Component,
          inputs: {text: 'Dashboard report opss'}
        }
      }
    }
  }
};
