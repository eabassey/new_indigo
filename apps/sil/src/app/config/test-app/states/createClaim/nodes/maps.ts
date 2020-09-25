import { NodeConfig } from '@wilo';
import * as TP from '@indigo/templates';
import {navigateToWorkflowButton} from '../../../shared';


export const maps: NodeConfig = {
  name: 'Maps',
  component: {
    children:[
      {
        component: TP.Node2Component,
        inputs: {
          text: 'Dummy screen for Maps'
        }
      },
    ]
  },
  navs: [
    navigateToWorkflowButton,
    {text: 'Back', routerLink: ['policyDetails'], location: 'right'},
    {text: 'Continue', routerLink: ['claimDetails'], location: 'right'}
  ],
  footerType: 'node_nav'
};
