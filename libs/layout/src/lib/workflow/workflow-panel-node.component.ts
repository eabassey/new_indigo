import { Component, Input } from '@angular/core';
import { CoreServices, PanelNodeBase } from '@wilo';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'workflow-panel-node',
    template: `
        <node-router [organisms]="organisms" [compInstances]="compInstances"></node-router>
    `
})
export class WorkflowPanelNodeComponent extends PanelNodeBase {
    constructor(svc: CoreServices, route: ActivatedRoute) {
        super(svc, route);
    }
}
