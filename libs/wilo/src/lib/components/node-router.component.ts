import { Component, Input, ComponentRef } from "@angular/core";
import { CoreServices } from '../services';


@Component({
    selector: 'node-router',
    template: `
        <ng-container *ngFor="let organism of organisms">
            <ndc-dynamic [ndcDynamicComponent]="organism.component"
              [ndcDynamicInputs]="organism?.inputs"
              [ndcDynamicOutputs]="organism?.outputs"
              (ndcDynamicCreated)="componentCreated($event)">
            </ndc-dynamic>
        </ng-container>
    `
})
export class NodeRouterComponent {
    @Input() organisms!: any;
    @Input() compInstances!: any[];
    constructor(private svc: CoreServices) {}

    componentCreated(compRef: ComponentRef<any>) {
        this.compInstances.push(compRef.instance);
        this.svc.footerAccessor.setCompInstances(this.compInstances);
      }
}