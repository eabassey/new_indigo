import { StateConfig } from '@wilo';


export const SIL_27: StateConfig = {
  id: '27',
  name: 'job-invoiced',
  startNode: 'MiscellaneousClass',
  nodes: {
    MiscellaneousClass: {
      id: 'miscellaneous-class',
      name: 'miscellaneous-class',
      nodeType: 'decision'
    }
  },

}
