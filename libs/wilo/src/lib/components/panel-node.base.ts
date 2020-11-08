import { Component, OnInit,  OnDestroy, ComponentRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import {  NodeConfig, ActionPanelConfig } from '../models';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CoreServices } from '../services';
import { renderServerCalls, renderTemplateDefs, renderServerQueries } from '../helpers/utils';
import { RulesService } from '../rules.service';


@Component({template: ''})
export class PanelNodeBase implements OnInit, OnDestroy, OnChanges {
    @Input() activePanel: ActionPanelConfig;
    activeNode: NodeConfig;
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

    ngOnChanges(changes: SimpleChanges) {
        if (changes.actionPanel) {
          console.log({panelPanel: this.activePanel})
            this.activeNode = this.activePanel.nodes[this.activePanel.startNode];
            if (this.activeNode) {
            this.renderNode(this.activeNode);
            }
        }
    }

    ngOnInit() {
        this.sub = this.route.queryParamMap.subscribe((paramMap) => {
            // Initialize the first node
            if (paramMap.has('panelNodeId')) {
                const panelNodeId = paramMap.get('panelNodeId');
                this.activeNode = this.activePanel?.nodes[panelNodeId];
                //
                if (this.activeNode) {
                  this.renderNode(this.activeNode);
                }
            }
        });
    }

    renderNode(activeNode) {
        if (activeNode) {
            if (activeNode.onNodeInit) {
                activeNode.onNodeInit.forEach(rule => this.rulesService.renderActionRule(rule));
            }
            if (activeNode.serverQueries) {
              this.serverQueriesSubs = renderServerQueries(activeNode.serverQueries, this.svc, this.route);
            }
            //
            if (this.activeNode.serverCalls) {
              this.serverCallsSubs = renderServerCalls(activeNode.serverCalls, this.svc, this.route, this.rulesService);
            }
            //
            if (this.activeNode.events) {
              this.eventsSub = Object.values(this.activeNode.events).map(rule => this.rulesService.renderWhenRule(rule).subscribe());
            }
            this.organisms = renderTemplateDefs(activeNode, this.svc, this.route, this.rulesService);
        }
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
      if (this.activeNode && this.activeNode.onNodeDestroy) {
          this.activeNode.onNodeDestroy.forEach(rule => this.rulesService.renderActionRule(rule));
        }
    }

}
