import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionPanelBase, CoreServices, RulesService } from '@wilo';


@Component({
    selector: 'workflow-action-panel',
    template: `
        <!-- <h1>Action Panel baseeee</h1> -->
        <workflow-panel-node [activePanel]="activePanel"></workflow-panel-node>
        <!-- <router-outlet></router-outlet> -->
        <!-- <node-router [organisms]="organisms" [compInstances]="compInstances"></node-router> -->
    `
})
export class WorkflowActionPanelComponent extends ActionPanelBase {
    constructor(svc: CoreServices, route: ActivatedRoute, rulesService: RulesService) {
        super(svc, route, rulesService);
    }


}
