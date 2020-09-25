import { NodeConfig } from '@wilo';
import * as TP from '@indigo/templates';
import {navigateToWorkflowButton} from '../../../shared';


export const submit: NodeConfig = {
  name: 'Submit',
  component: {
    children:[
      {
        component: TP.Node2Component,
        inputs: {
          text: 'Dummy screen for Submit'
        }
      },
    ]
  },
  navs: [
    navigateToWorkflowButton,
    {text: 'Back', routerLink: ['history'], location: 'right'},
    {text: 'Save As Draft', location: 'right'},
    {text: 'Submit', location: 'right'},

  ],
  footerType: 'node_nav'
};
