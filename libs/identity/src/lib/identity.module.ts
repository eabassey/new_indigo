import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoAuthGuard, AuthGuard } from './guards';
import { AuthenticationService, AuthorizationService, LocalAuthInterceptorService } from './services';
import { StoreModule } from '@ngrx/store';
import { identityReducer, IdentityEffects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ENVIRONMENT, IdentityConfig, IDENTITY_CONFIG, JWT_TOKEN_KEY } from './services/constants';
import { MsalModule } from '@azure/msal-angular';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    // environment['azure']
    //   ? MsalModule.forRoot({
    //       auth: {
    //         clientId: environment['azure']['clientId'],
    //         postLogoutRedirectUri: `${environment.base_url}auth/login`
    //       }
    //     })
    //   : CommonModule,
    StoreModule.forFeature('identity', identityReducer),
    EffectsModule.forFeature([IdentityEffects])
  ],
  declarations: [],
  providers: [],
  exports: [AuthModule]
})
export class IdentityModule {
  static forRoot(config: IdentityConfig, environment: any): ModuleWithProviders {
    return {
      ngModule: IdentityModule,
      providers: [
        { provide: IDENTITY_CONFIG, useValue: config },
        { provide: ENVIRONMENT, useValue: environment },
        {provide: JWT_TOKEN_KEY, useValue: localStorage.getItem('flexus.web.jwtToken')},
        NoAuthGuard,
        AuthGuard,
        LocalAuthInterceptorService,
        AuthenticationService,
        AuthorizationService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LocalAuthInterceptorService,
          multi: true
        }
      ]
    };
  }
}
