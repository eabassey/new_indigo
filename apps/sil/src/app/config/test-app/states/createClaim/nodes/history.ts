import { NodeConfig } from '@wilo';
import * as TP from '@indigo/templates';
import {navigateToWorkflowButton} from '../../../shared';


export const history: NodeConfig = {
  name: 'History',
  component: {
    children:[
      {
        component: TP.Node2Component,
        inputs: {
          text: 'Dummy screen for History'
        }
      },
    ]
  },
  navs: [
    navigateToWorkflowButton,
    {text: 'Back', routerLink: ['excess'], location: 'right'},
    {text: 'Continue', routerLink: ['submit'], location: 'right'}

  ],
  footerType: 'node_nav'
};
