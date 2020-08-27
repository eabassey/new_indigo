
import { testApp } from './test-app';
import { ClientConfig } from '@indigo/engine';

export const silConfig: ClientConfig = {
    name: 'Standard Bank',
    startApp: 'testApp',
    apps: {
        testApp
    }
};
