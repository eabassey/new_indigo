import { InjectionToken } from '@angular/core';

export interface IdentityConfig {
  after_login_url: string;
  after_logout_url: string;
  login_endpoint?: string;
  send_reset_link_endpoint?: string;
  no_auth_urls?: string[];
}

export const IDENTITY_CONFIG = new InjectionToken<IdentityConfig>('IDENTITY_CONFIG');


export const ENVIRONMENT = new InjectionToken<any>('ENVIRONMENT');
export const JWT_TOKEN_KEY = new InjectionToken<string>('JWT_TOKEN_KEY');
