import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, APP_INITIALIZER, DoBootstrap, Injector, NgModule } from '@angular/core';
import {WiloModule, AuthService, CoreServices, ClientConfig} from '@wilo';
import {WorkflowLayoutModule, WorkflowLayoutComponent, RoutesService} from '@indigo/layout';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {silConfig} from './config';
import { SilService } from './sil.service';
import { environment } from '../environments/environment';
// import { requestOptionsProvider, Interceptor } from './interceptor';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {DynamicFormsModule} from '@indigo/dynamic-forms'
// import {DynFormModule} from 'src/app/dyn-form/dyn-form.module';
import {AuthImplService, IdentityModule} from '@indigo/identity';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    WorkflowLayoutModule,
    DynamicFormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    WiloModule.forRoot({
      clientConfig: silConfig,
      clientService: SilService,
      indexedDbName: 'dynDB',
      base_url: environment.api_url
    }),
    IdentityModule.forRoot({
      after_login_url: '/testApp/workflow/list',
      after_logout_url: '/auth/login',
      send_reset_link_endpoint: `${environment.api_url}v1/forgot_password/check-email`,
      login_endpoint: `${environment.api_url}v2/auth/login/`,
      no_auth_urls: ['/cons']
    }, environment),
    // DynFormModule,
    RouterModule.forRoot([]),
StoreDevtoolsModule.instrument()
  ],
  providers: [
    {provide: AuthService, useExisting: AuthImplService},
    {provide: 'BACKEND_API_URL', useValue: environment.api_url},
    // Intercep*-/tor,
    // requestOptionsProvider
  ],
  // bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap{
  constructor(private svc: CoreServices, private rs: RoutesService) {}
  ngDoBootstrap(app: ApplicationRef) {
    fetch(environment.config_url).then(res => res.json())
    .then(config => {
      console.log({config})
      this.rs.generateAppRoutes(config.apps);
      this.svc.router.config.unshift({path: '', redirectTo: config.startApp, pathMatch: 'full'});
      console.log({routes: this.svc.router.config})
      app.bootstrap(AppComponent)
    });
  }
 }
