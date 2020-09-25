import {FooterButtonConfig} from '@wilo';

export const navigateToWorkflowButton: FooterButtonConfig = {
  text: 'To Workflow',
  onClick: (svc) => {
    const url = svc.keyValueStore.getItem('workflowURL');
    svc.router.navigateByUrl(url);
  },
  location: 'left'
};
