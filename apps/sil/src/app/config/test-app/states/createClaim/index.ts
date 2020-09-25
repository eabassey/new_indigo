import { StateConfig } from '@wilo';
import {policyLookup} from './nodes/policyLookup';
import {policyDetails} from './nodes/policyDetails';
import {maps} from './nodes/maps';
import {claimDetails} from './nodes/claimDetails';
import {appointments} from './nodes/appointments';
import {excess} from './nodes/excess';
import {history} from './nodes/history';
import {submit} from './nodes/submit';

export const createClaim: StateConfig = {
    id: 'createClaim',
    name: 'createClaim',
    title: 'Create Claim',
    startNode: 'policyLookup',
    showTabs: true,
    nodes: {
      policyLookup,
      policyDetails,
      maps,
      claimDetails,
      appointments,
      excess,
      history,
      submit
    }
}
