import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { DynamicModule } from 'ng-dynamic-component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicIoModule } from 'ng-dynamic-component';
import {RouterModule, Route } from '@angular/router';
import { CLIENT_SERVICE, BASE_URL, INDEXED_DB_NAME } from './services/constants';
import { NodeFooterButtonComponent } from './components/node-footer-button.component';
import { StoreModule } from '@ngrx/store';
import { wiloReducers } from './store';
import { NodeRouterComponent } from './components/node-router.component';
import { ClientConfig } from './models';
import { DecisionNodeComponent } from './components';
import { TemplatesModule } from './templates';



const coreModules = [
    DynamicModule,
    HttpClientModule,
    ReactiveFormsModule,
    DynamicIoModule,
    TemplatesModule
];
@NgModule({
  declarations: [
    NodeFooterButtonComponent,
    NodeRouterComponent,
    DecisionNodeComponent,
  ],
  imports: [CommonModule, StoreModule.forFeature('dyn', wiloReducers), RouterModule, ...coreModules],
  exports: [...coreModules, NodeRouterComponent, NodeFooterButtonComponent, TemplatesModule, RouterModule]
})
export class WiloModule {
  constructor(@Optional() @SkipSelf() parentModule: WiloModule) {
    if ( parentModule ) {
          throw new Error('WilowModule is already loaded. Import it in the AppModule only!');
      }
  }
  static forRoot(config: {
    clientService: any;
    base_url: string;
    indexedDbName: string;
  }): ModuleWithProviders<WiloModule> {
    return {
      ngModule: WiloModule,
      providers: [
        {provide: CLIENT_SERVICE, useExisting: config.clientService},
        {provide: BASE_URL, useValue: config.base_url},
        {provide: INDEXED_DB_NAME, useValue: config.indexedDbName},
      ]
    };
  }
 }
