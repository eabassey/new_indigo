import { Component } from '@angular/core';
import { CoreServices, StateBase } from '@wilo';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'workflow-state',
    template: `
    <router-outlet></router-outlet>
    <!-- <workflow-node [node]="node"></workflow-node> -->
                <app-footer></app-footer>
    `,
    styleUrls: ['workflow-state.component.scss']
})
export class WorkflowStateComponent extends StateBase {
    constructor(svc: CoreServices, route: ActivatedRoute) {
        super(svc, route);
    }
}
