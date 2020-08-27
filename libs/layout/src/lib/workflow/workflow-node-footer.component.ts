import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreServices, NodeFooterBase } from '@indigo/engine';


@Component({
    selector: 'workflow-node-footer',
    template: `
        <ng-container *ngFor="let nav of navs">
            <node-footer-button [nav]="nav" [compInstances]="compInstances"></node-footer-button>
        </ng-container>
    `
})
export class WorkflowNodeFooterComponent extends NodeFooterBase {

    constructor(svc: CoreServices, route: ActivatedRoute) {
        super(svc, route);
    }


}
