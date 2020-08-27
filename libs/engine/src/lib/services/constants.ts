import { InjectionToken } from '@angular/core';
import { ClientConfig } from '../models';


export const CLIENT_CONFIG = new InjectionToken<ClientConfig>('CLIENT_CONFIG');
export const CLIENT_SERVICE = new InjectionToken<any>('CLIENT_SERVICE');
export const BASE_URL = new InjectionToken<string>('BASE_URL');
export const INDEXED_DB_NAME = new InjectionToken<string>('INDEXED_DB_NAME');