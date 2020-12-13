import { OnInit,  OnDestroy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {   TemplateDefinition, ActionPanelConfig } from '../models';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CoreServices } from '../services';
import { renderServerCalls, renderTemplateDefs, renderServerQueries, renderFormModels } from '../helpers/utils';
import { RulesService } from '../rules.service';

@Component({template: ''})
export abstract class ActionPanelBase implements OnInit, OnChanges, OnDestroy {
    @Input() activePanel: ActionPanelConfig;
    serverCallsSubs: Subscription[];
    serverQueriesSubs: Subscription[];
    setValuesSub: Subscription;
    eventsSub: Subscription[];
    sub: Subscription;

    constructor(private svc: CoreServices, private route: ActivatedRoute, private rulesService: RulesService) {}

    ngOnInit() {
        if (this.activePanel) {
            this.handleConfig(this.activePanel);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['activePanel']?.currentValue) {
        this.handleConfig(this.activePanel);
      }
    }

    handleConfig(panel: ActionPanelConfig) {
        if (panel?.onPanelInit) {
            panel.onPanelInit.forEach(rule => this.rulesService.renderActionRule(rule));
        }
        if (panel?.serverQueries) {
            this.serverQueriesSubs = renderServerQueries(panel.serverQueries, this.svc, this.route)
        }
        if (panel?.serverCalls) {
            this.serverCallsSubs = renderServerCalls(panel.serverCalls, this.svc, this.route, this.rulesService);
        }
        // if (panel?.setValuesToBigForm) {
        //     this.setValuesSub = panel.setValuesToBigForm(this.svc, this.route).subscribe();
        // }
        if (panel?.events) {
          this.eventsSub = Object.values(panel.events).map(rule => this.rulesService.renderWhenRule(rule).subscribe());
        }
        // Customize headers for action panel
        // const controls = panel.controls ? panel.controls(this.svc) : [];
        // if (controls) {
        //     this.svc.headerAcessor.setHeaderControls(controls);
        // }
    }


    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        if (this.setValuesSub) {
            this.setValuesSub.unsubscribe();
        }
        if (this.serverQueriesSubs) {
            this.serverQueriesSubs.forEach(sb => sb.unsubscribe());
        }
        if (this.serverCallsSubs) {
          this.serverCallsSubs.forEach(sb => sb.unsubscribe());
        }
        if (this.eventsSub) {
            this.eventsSub.forEach(sub => sub.unsubscribe());
        }
        if (this.activePanel && this.activePanel.onPanelDestroy) {
            this.activePanel.onPanelDestroy.forEach(rule => this.rulesService.renderActionRule(rule));
        }
    }

}
