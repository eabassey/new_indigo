import { Component, OnInit,  OnDestroy } from '@angular/core';
import {  NodeConfig } from '../models';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CoreServices } from '../services';
import { renderServerCalls, renderTemplateDefs, renderEvents, renderServerQueries } from '../helpers/utils';


@Component({template: ''})
export abstract class NodeBase implements OnDestroy, OnInit {
    node!: NodeConfig;
    sub!: Subscription;
    compInstances: any[] = [];
    serverQueriesSubs!: Subscription[];
    organisms: any[] = [
        // {
        //   component: TestComponent,
        //   inputs: {},
        // },
      ];
  serverCallsSubs!: Subscription[];
  eventsSub!: Subscription[];

    constructor(private svc: CoreServices, private route: ActivatedRoute) {}

    ngOnInit() {
      this.sub =  this.route.data.subscribe((node: any) => {
        this.node = node as NodeConfig;
        this.svc.configAccessor.setNode(node);
        this.handleConfig(node);
      });
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
        this.eventsSub = renderEvents(node.events, this.svc, this.route);
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
