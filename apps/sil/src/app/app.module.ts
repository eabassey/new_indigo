import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {EngineModule, AuthService} from '@indigo/engine';
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
// import {DynFormModule} from 'src/app/dyn-form/dyn-form.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EngineModule,
    WorkflowLayoutModule,
    StoreModule.forRoot({}),
    EngineModule.forRoot({
      clientConfig: silConfig,
      clientService: SilService,
      indexedDbName: 'dynDB',
      base_url: environment.bff_url
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
    Interceptor,
    requestOptionsProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
