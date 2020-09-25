import { NodeConfig } from '@wilo';
import * as TP from '@indigo/templates';
import {navigateToWorkflowButton} from '../../../shared';


export const excess: NodeConfig = {
  name: 'Excess',
  component: {
    children:[
      {
        component: TP.Node2Component,
        inputs: {
          text: 'Dummy screen for Excess'
        }
      },
    ]
  },
  navs: [
    navigateToWorkflowButton,
    {text: 'Back', routerLink: ['appointments'], location: 'right'},
    {text: 'Continue', routerLink: ['history'], location: 'right'}

  ],
  footerType: 'node_nav'
};
