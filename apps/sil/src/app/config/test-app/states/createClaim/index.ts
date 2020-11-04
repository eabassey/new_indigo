import { StateConfig } from '@wilo';
import { navigateToWorkflowButton } from '../../shared';
import * as TP from '@indigo/templates';


export const createClaim: StateConfig = {
    id: 'createClaim',
    name: 'createClaim',
    title: {template: 'Create Claim'},
    startNode: 'policyLookup',
    showTabs: true,
    nodes: {
      policyLookup: {
        name: 'Policy Lookup',
        component: {
          children:[
            {
              component: 'Node2Component',
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
      },
      policyDetails: {
        name: 'Policy Details',
        component: {
          children:[
            {
              component: 'Node2Component',
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
      },
      maps: {
        name: 'Maps',
        component: {
          children:[
            {
              component: 'Node2Component',
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
      },
      claimDetails: {
        name: 'Claim Details',
        component: {
          children:[
            {
              component: 'Node2Component',
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
      },
      appointments: {
        name: 'Appointments',
        component: {
          children:[
            {
              component: 'Node2Component',
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
      },
      excess: {
        name: 'Excess',
        component: {
          children:[
            {
              component: 'Node2Component',
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
      },
      history: {
        name: 'History',
        component: {
          children:[
            {
              component: 'Node2Component',
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
      },
      submit: {
        name: 'Submit',
        component: {
          children:[
            {
              component: 'Node2Component',
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
      }
    }
}
