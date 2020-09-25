import { NodeConfig } from '@wilo';
import * as TP from '@indigo/templates';
import {navigateToWorkflowButton} from '../../../shared';

export const policyLookup: NodeConfig = {
  name: 'Policy Lookup',
  component: {
    children:[
      {
        component: TP.Node2Component,
        inputs: {
          text: 'Dummy screen for Policy Lookup'
        }
      },
    ]
  },
  navs: [
    navigateToWorkflowButton,
    {text: 'Continue', routerLink: ['policyDetails'], location: 'right'}
  ],
  footerType: 'node_nav'
};
