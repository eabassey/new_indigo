import { of } from 'rxjs';
import { testState1 } from './states/test-state1';
import { workflow} from './states/workflow';
import { AppConfig } from '@indigo/engine';


export const testApp: AppConfig = {
    appKey: 'test',
    appMenu: () => of([]),
    startState: 'workflow',
    appStates: {
        testState1,
        workflow
    },
}
