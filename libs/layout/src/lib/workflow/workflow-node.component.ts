import { Component } from '@angular/core';
import { CoreServices, FlexusNodeBase } from '@wilo';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'workflow-node',
    template: `
        <node-router [organisms]="organisms" [compInstances]="compInstances"></node-router>
    `
})
export class WorkflowNodeComponent extends FlexusNodeBase {
    constructor(svc: CoreServices, route: ActivatedRoute) {
        super(svc, route);
    }
}
