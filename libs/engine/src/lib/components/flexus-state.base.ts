import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { StateConfig, ServerCallConfig, NodeConfig } from '../models';
import { CoreServices } from '../services/core.services';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { renderServerCalls, renderEvents, renderFormModels, renderServerQueries } from '../helpers/utils';

@Component({template: ''})
export abstract class FlexusStateBase implements OnChanges, OnDestroy {
    @Input() state: StateConfig;
    @Input() node: NodeConfig;
    sub: Subscription;
    eventsSub: Subscription[];
    setValuesSub: Subscription;
    test;
    serverCallsSubs: Subscription[];
    serverQueriesSubs: Subscription[];

    constructor(private svc: CoreServices,  private route: ActivatedRoute) {}

    ngOnChanges() {
        this.handleConfig(this.state);
    }


    handleConfig(state: StateConfig) {
          //
        if (state?.onStateInit) {
            state.onStateInit(this.svc, this.route);
        }
        //
        if (state?.actionPanel) {
            const panels = Object.values(state.actionPanel);
            this.svc.actionPanel.setActionPanel(panels);
        }
        //
        // const formGroup = this.svc.bf.createFormGroup(renderFormModels(state));
        // this.svc.bf.initialize(formGroup);
        //
        // initialize form fields
        if (state?.setValuesToBigForm) {
            this.setValuesSub = state.setValuesToBigForm(this.svc, this.route).subscribe();
        }
        if (state?.serverQueries) {
            this.serverQueriesSubs = renderServerQueries(state.serverQueries, this.svc, this.route)
          }
        //
        if (state?.serverCalls) {
            this.serverCallsSubs = renderServerCalls(state.serverCalls, this.svc, this.route);
        }
        //
        if (state?.events) {
            this.eventsSub = renderEvents(state.events, this.svc);
        }
        const controls = state.controls ? state.controls(this.svc) : [];
        this.svc.headerAcessor.setHeaderControls(controls);
    }



    ngOnDestroy() {
        if (this.eventsSub) {
            this.eventsSub.forEach(sub => sub.unsubscribe());
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
        if (this.state && this.state.onStateDestroy) {
            this.state.onStateDestroy(this.svc, this.route);
        }

        if(this.test) {
            this.test.unsubscribe();
        }
    }


}
