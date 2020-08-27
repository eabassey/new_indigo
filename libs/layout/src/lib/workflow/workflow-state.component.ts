import { Component } from '@angular/core';
import { CoreServices, FlexusStateBase } from '@indigo/engine';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'workflow-state',
    template: `
    <!-- <router-outlet></router-outlet> -->
    <workflow-node [node]="node"></workflow-node>
    `,
    styleUrls: ['workflow-state.component.scss']
})
export class WorkflowStateComponent extends FlexusStateBase {
    constructor(svc: CoreServices, route: ActivatedRoute) {
        super(svc, route);
    }
}
