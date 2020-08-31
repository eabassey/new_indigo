import { Component, OnInit,  OnDestroy, ComponentRef, Inject, OnChanges, Input } from '@angular/core';
import {  NodeConfig, ClientConfig, StateConfig, AppConfig } from '../models';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CoreServices, CLIENT_CONFIG } from '../services';
import { renderServerCalls, renderTemplateDefs, renderEvents, renderServerQueries } from '../helpers/utils';


@Component({template: ''})
export abstract class FlexusNodeBase implements OnDestroy, OnChanges {
    @Input() node: NodeConfig;
    sub: Subscription;
    compInstances = [];
    serverQueriesSubs: Subscription[];
    organisms = [
        // {
        //   component: TestComponent,
        //   inputs: {},
        // },
      ];
  serverCallsSubs: Subscription[];
  eventsSub: Subscription[];

    constructor(private svc: CoreServices, private route: ActivatedRoute) {}

    ngOnChanges() {
      console.log({node: this.node})
      this.handleConfig(this.node);
    }

    handleConfig(node: NodeConfig) {
      //
      if (node?.onNodeInit) {
        node.onNodeInit(this.svc, this.route);
      }
      if (node?.serverQueries) {
        this.serverQueriesSubs = renderServerQueries(node.serverQueries, this.svc, this.route)
      }
      //
      if (node?.serverCalls) {
        this.serverCallsSubs = renderServerCalls(node.serverCalls, this.svc, this.route);
      }
      //
      if (node?.events) {
        this.eventsSub = renderEvents(node.events, this.svc);
      }
      this.organisms = renderTemplateDefs(node, this.svc, this.route);
      this.svc.footerAccessor.setNodeForFooter(node);
    }



    ngOnDestroy() {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      if (this.eventsSub) {
        this.eventsSub.forEach(sub => sub.unsubscribe());
       }
      if (this.serverQueriesSubs) {
        this.serverQueriesSubs.forEach(sb => sb.unsubscribe());
      }
      if (this.serverCallsSubs) {
         this.serverCallsSubs.forEach(sb => sb.unsubscribe());
        }
      if (this.node && this.node.onNodeDestroy) {
          this.node.onNodeDestroy(this.svc, this.route);
        }
    }

}