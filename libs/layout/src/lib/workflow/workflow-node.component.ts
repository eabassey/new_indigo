import { Component } from '@angular/core';
import { CoreServices, NodeBase } from '@wilo';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'workflow-node',
    template: `
        <node-router [organisms]="organisms" [compInstances]="compInstances"></node-router>
    `
})
export class WorkflowNodeComponent extends NodeBase {
    constructor(svc: CoreServices, route: ActivatedRoute) {
        super(svc, route);
    }
}
