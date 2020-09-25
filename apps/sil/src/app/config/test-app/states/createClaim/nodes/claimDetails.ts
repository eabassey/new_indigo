import { NodeConfig } from '@wilo';
import * as TP from '@indigo/templates';
import {navigateToWorkflowButton} from '../../../shared';


export const claimDetails: NodeConfig = {
  name: 'Claim Details',
  component: {
    children:[
      {
        component: TP.Node2Component,
        inputs: {
          text: 'Dummy screen for Claim Details'
        }
      },
    ]
  },
  navs: [
    navigateToWorkflowButton,
    {text: 'Back', routerLink: ['maps'], location: 'right'},
    {text: 'Continue', routerLink: ['appointments'], location: 'right'}

  ],
  footerType: 'node_nav'
};
