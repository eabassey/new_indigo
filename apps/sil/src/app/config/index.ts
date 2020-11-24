
import { testApp } from './test-app';
import { dashboardApp } from './dashboard-app';
import { ClientConfig } from '@wilo';

export const clientConfig: ClientConfig = {
    name: 'Standard Bank',
    startApp: 'testApp',
    apps: {
        testApp,
        dashboardApp
    }
};
