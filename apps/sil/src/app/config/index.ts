
import { testApp } from './test-app';
import { ClientConfig } from '@wilo';

export const silConfig: ClientConfig = {
    name: 'Standard Bank',
    startApp: 'testApp',
    apps: {
        testApp
    }
};
