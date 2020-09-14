import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {WiloModule, AuthService} from '@wilo';
import {WorkflowLayoutModule, WorkflowLayoutComponent} from '@indigo/layout';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {silConfig} from './config';
import { SilService } from './sil.service';
import { AuthImplService } from './auth-impl.service';
import { environment } from '../environments/environment';
import { requestOptionsProvider, Interceptor } from './interceptor';
import {TemplatesModule} from '@indigo/templates';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {DynamicFormsModule} from '@indigo/dynamic-forms'
// import {DynFormModule} from 'src/app/dyn-form/dyn-form.module';

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
    WiloModule.forRoot({
      clientConfig: silConfig,
      clientService: SilService,
      indexedDbName: 'dynDB',
      base_url: environment.api_url
    }),
    TemplatesModule,
    // DynFormModule,
    RouterModule.forRoot([], {
    initialNavigation: 'enabled'
}),
StoreDevtoolsModule.instrument()
  ],
  providers: [
    {provide: AuthService, useExisting: AuthImplService},
    {provide: 'BACKEND_API_URL', useValue: environment.api_url},
    Interceptor,
    requestOptionsProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
