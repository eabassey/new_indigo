import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {WiloModule, AuthService, wiloReducers} from '@wilo';
import {WorkflowLayoutModule, WorkflowLayoutComponent} from '@indigo/layout';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {clientConfig} from './config';
import { AppService } from './app.service';
import { environment } from '../environments/environment';
// import { requestOptionsProvider, Interceptor } from './interceptor';
import {TemplatesModule} from '@indigo/templates';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {DynamicFormsModule} from '@indigo/dynamic-forms'
// import {DynFormModule} from 'src/app/dyn-form/dyn-form.module';
import {SilComponentsModule} from './components/sil-components.module';
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
    StoreModule.forRoot(wiloReducers),
    EffectsModule.forRoot([]),
    WiloModule.forRoot({
      clientConfig: clientConfig, 
      clientService: AppService,
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
    SilComponentsModule,
    TemplatesModule,
    RouterModule.forRoot([]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    {provide: AuthService, useExisting: AuthImplService},
    {provide: 'BACKEND_API_URL', useValue: environment.api_url},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
