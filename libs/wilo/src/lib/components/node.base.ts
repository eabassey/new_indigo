import { Component, OnInit,  OnDestroy } from '@angular/core';
import {  NodeConfig } from '../models';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CoreServices } from '../services';
import { renderServerCalls, renderTemplateDefs, renderServerQueries } from '../helpers/utils';
import { RulesService } from '../rules.service';


@Component({template: ''})
export abstract class NodeBase implements OnDestroy, OnInit {
    node: NodeConfig;
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

    constructor(private svc: CoreServices, private route: ActivatedRoute, private rulesService: RulesService) {}

    ngOnInit() {
      this.sub =  this.route.data.subscribe((node: NodeConfig) => {
        this.node = node;
        this.svc.configAccessor.setNode(node);
        this.handleConfig(node);
      });
    }

    handleConfig(node: NodeConfig) {
      //
      if (node?.onNodeInit) {
        node.onNodeInit.forEach(rule => this.rulesService.renderActionRule(rule));
      }
      if (node?.serverQueries) {
        this.serverQueriesSubs = renderServerQueries(node.serverQueries, this.svc, this.route)
      }
      //
      if (node?.serverCalls) {
        this.serverCallsSubs = renderServerCalls(node.serverCalls, this.svc, this.route, this.rulesService);
      }
      //
      if (node?.events) {
        this.eventsSub = Object.values(node.events).map(rule => this.rulesService.renderWhenRule(rule).subscribe());
      }
      this.organisms = renderTemplateDefs(node, this.svc, this.route, this.rulesService);
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
          this.node.onNodeDestroy.forEach(rule => this.rulesService.renderActionRule(rule));
        }
    }

}
