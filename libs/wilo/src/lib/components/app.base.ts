import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { StateConfig, AppConfig, NodeConfig, ActionPanelConfig } from '../models';
import { CoreServices } from '../services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { renderServerCalls, renderEvents, renderServerQueries } from '../helpers/utils';
import {delay} from 'rxjs/operators';
import { EventEmitter } from 'events';

@Component({template: ''})
export abstract class AppBase implements OnInit, OnChanges, OnDestroy {
    app: AppConfig;
    activePanel: ActionPanelConfig;
    sub: Subscription;
    panelActionsSub: Subscription;
    panelsMap: {[id: string]: ActionPanelConfig}
    expandActionPanel;
    clickedActionPanel = null;
    serverCallsSubs: Subscription[];
    serverQueriesSubs: Subscription[];
    eventsSub: Subscription[];
    paramsSub: Subscription;
    panelActions = [];

    // ...
    constructor(private svc: CoreServices, private route: ActivatedRoute, private router: Router) {}
    ngOnInit() {
      this.sub = this.route.data.subscribe((app: AppConfig) => {
        this.app = app;
        this.svc.configAccessor.setApp(app);
        this.handleConfig(app);
      });
      this.panelActionsSub = this.svc.actionPanel.panelActions$.pipe(delay(0)).subscribe((panelsMap) => {
        this.panelsMap = panelsMap;
        const res = Object.values(panelsMap).map(act => ({id: act.id, path: act.id, instruction: act.instruction, icon: act.icon}));
        this.panelActions = res || [];
      });
        this.getQueryParams();
    }
    ngOnChanges() {
        // this.handleConfig(this.app);
    }

    getQueryParams() {
        this.paramsSub = this.route.queryParamMap.subscribe((paramMap) => {
            // Initialize the first node
            if (paramMap.has('expandActionPanel')) {
                this.expandActionPanel = paramMap.get('expandActionPanel') === 'true' ? true : false;
                console.log({exp: this.expandActionPanel})
            }
            this.initActionPanel(paramMap.get('panelId'));
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
            this.serverCallsSubs = renderServerCalls(app.serverCalls, this.svc, this.route);
        }
        //
        if (app?.events) {
            this.eventsSub = renderEvents(app.events, this.svc);
        }
    }


    initActionPanel(panel): void {
        if (panel && this.clickedActionPanel !== panel && this.clickedActionPanel) {
            this.clickedActionPanel = panel;
            this.activePanel = this.panelsMap[this.clickedActionPanel];
        }
    }


    clickPanel(path: string) {
        console.log({path})
        if (this.clickedActionPanel && this.clickedActionPanel === path) {
            this.toggleActionPanel();
          } else {
              this.expandActionPanel = true;
            this.clickedActionPanel = path;
            this.activePanel = this.panelsMap[this.clickedActionPanel];
          }
    }

    toggleActionPanel() {
        if (this.expandActionPanel) {
              this.expandActionPanel = false;
        } else {
              this.expandActionPanel = true;
        }
    }

    ngOnDestroy(): void {
        if (this.serverQueriesSubs) {
            this.serverQueriesSubs.forEach(sb => sb.unsubscribe());
        }
        if (this.paramsSub) {
            this.paramsSub.unsubscribe();
        }
        if (this.panelActionsSub) {
          this.panelActionsSub.unsubscribe();
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
