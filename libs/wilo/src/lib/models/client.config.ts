import { AppConfig } from './app.config';

export interface ClientConfig {
    name?: string;
    address?: string;
    startApp: string;
    apps: {[id: string]: AppConfig};
}
