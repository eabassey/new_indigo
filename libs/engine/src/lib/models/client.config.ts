import {App} from './app';
import { AppConfig } from './app.config';

export interface ClientConfig {
    name: string;
    address?: string;
    colorSet?: any;
    startApp: string;
    apps: {[id: string]: AppConfig};
}