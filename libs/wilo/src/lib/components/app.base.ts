import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { StateConfig, AppConfig, NodeConfig, ActionPanelConfig } from '../models';
import { CoreServices } from '../services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { renderServerCalls, renderEvents, renderServerQueries } from '../helpers/utils';
import {delay} from 'rxjs/operators';
import { EventEmitter } from 'events';
import { RulesService } from '../rules.service';

@Component({template: ''})
export abstract class AppBase implements OnInit, OnDestroy {
    app: AppConfig;

    sub: Subscription;

    serverCallsSubs: Subscription[];
    serverQueriesSubs: Subscription[];
    eventsSub: Subscription[];



    // ...
    constructor(private svc: CoreServices, private route: ActivatedRoute, private router: Router, private rulesService: RulesService) {}
    ngOnInit() {
      this.sub = this.route.data.subscribe((app: AppConfig) => {
        this.app = app;
        this.svc.configAccessor.setApp(app);
        this.handleConfig(app);
      });

    }


    handleConfig(app: AppConfig): void {
        if (app.eventListeners) {
          app.eventListeners(this.svc.eventBus);
        }

        if (app?.onAppInit) {
            app.onAppInit(this.svc, this.route);
        }
        if (app?.serverQueries) {
            this.serverQueriesSubs = renderServerQueries(app.serverQueries, this.svc, this.route)
        }
        if (app?.serverCalls) {
            this.serverCallsSubs = renderServerCalls(app.serverCalls, this.svc, this.route, this.rulesService);
        }
        //
        if (app?.events) {
            this.eventsSub = renderEvents(app.events, this.svc, this.route, this.rulesService);
        }
    }




    ngOnDestroy(): void {
        if (this.serverQueriesSubs) {
            this.serverQueriesSubs.forEach(sb => sb.unsubscribe());
        }


        if (this.serverCallsSubs) {
            this.serverCallsSubs.forEach(sb => sb.unsubscribe());
        }
        if (this.eventsSub) {
            this.eventsSub.forEach(sub => sub.unsubscribe());
        }
        if (this.app && this.app.onAppDestroy) {
            this.app.onAppDestroy(this.svc, this.route);
        }
    }

}
