import { Component } from '@angular/core';
import { CoreServices, NodeBase, RulesService } from '@wilo';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'workflow-node',
    template: `
        <node-router [organisms]="organisms" [compInstances]="compInstances"></node-router>
    `
})
export class WorkflowNodeComponent extends NodeBase {
    constructor(svc: CoreServices, route: ActivatedRoute, rulesService: RulesService) {
        super(svc, route, rulesService);
    }
}
