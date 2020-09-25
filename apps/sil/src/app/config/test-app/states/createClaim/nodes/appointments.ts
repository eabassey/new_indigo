import { NodeConfig } from '@wilo';
import * as TP from '@indigo/templates';
import {navigateToWorkflowButton} from '../../../shared';


export const appointments: NodeConfig = {
  name: 'Appointments',
  component: {
    children:[
      {
        component: TP.Node2Component,
        inputs: {
          text: 'Dummy screen for Appointments'
        }
      },
    ]
  },
  navs: [
    navigateToWorkflowButton,
    {text: 'Back', routerLink: ['claimDetails'], location: 'right'},
    {text: 'Continue', routerLink: ['excess'], location: 'right'}

  ],
  footerType: 'node_nav'
};
