import { NodeConfig } from '@wilo';
import * as TP from '@indigo/templates';
import {navigateToWorkflowButton} from '../../../shared';


export const policyDetails: NodeConfig = {
  name: 'Policy Details',
  component: {
    children:[
      {
        component: TP.Node2Component,
        inputs: {
          text: 'Dummy screen for Policy Details'
        }
      },
    ]
  },
  navs: [
    navigateToWorkflowButton,
    {text: 'Back', routerLink: ['policyLookup'], location: 'right'},
    {text: 'Continue', routerLink: ['maps'], location: 'right'}
  ],
  footerType: 'node_nav'
};
