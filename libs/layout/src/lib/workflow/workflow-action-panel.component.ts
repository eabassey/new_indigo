import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlexusActionPanelBase, CoreServices } from '@wilo';


@Component({
    selector: 'workflow-action-panel',
    template: `
        <h1>Action Panel baseeee</h1>
        <workflow-panel-node [activePanel]="activePanel"></workflow-panel-node>
        <!-- <router-outlet></router-outlet> -->
        <!-- <node-router [organisms]="organisms" [compInstances]="compInstances"></node-router> -->
    `
})
export class WorkflowActionPanelComponent extends FlexusActionPanelBase {
    constructor(svc: CoreServices, route: ActivatedRoute) {
        super(svc, route);
    }


}
