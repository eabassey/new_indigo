import { AppConfig } from '@wilo';


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
          component: 'Node2Component',
          inputs: {text: 'Dashboard report opss'}
        }
      }
    }
  }
};
