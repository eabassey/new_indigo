import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CoreServices } from '../services/core.services';
import { Subscription, Observable } from 'rxjs';
import { AppConfig, StateConfig, NodeConfig, ClientConfig } from '../models';
import { CLIENT_CONFIG } from '../services';

@Component({template: ''})
export abstract class ClientConfigBase implements OnInit, OnDestroy {
    loading$: Observable<boolean>;
    app: AppConfig;
    state: StateConfig;
    node: NodeConfig;
    sub: Subscription;
  constructor(
    public svc: CoreServices,
    public route: ActivatedRoute,
    @Inject(CLIENT_CONFIG) public clientConfig: ClientConfig
  ) {}

    ngOnInit() {
      this.loading$ = this.svc.loader.loading$;
      this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
        const appId = params.get('app');
        const stateId = params.get('state');
        const nodeId = params.get('node');
        this.app = this.clientConfig.apps[appId];
        this.state = this.app.appStates[stateId];
        this.node = this.state.nodes[nodeId];
        console.log({appId, stateId, nodeId,a: this.app, s: this.state, n: this.node});
      });
    }


    ngOnDestroy() {
      if (this.sub) {
        this.sub.unsubscribe();
      }
    }

}
