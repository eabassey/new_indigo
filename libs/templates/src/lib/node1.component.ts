import { Component, Input, Output, EventEmitter } from "@angular/core";



@Component({
    selector: 'node1',
    template: `Node1 stuff: {{greeting}}
        <button (click)="doWork.emit('workings')">doWork</button>
        <button (click)="setFilter.emit({by_state2: 7})">Filter Top</button>
        <button (click)="setFilter.emit({by_state: 10})">Filter Down</button>
        <button (click)="resetFilter.emit()">Reset Filter</button>
        <a href="/home">Go Home</a>
        <!-- <a [routerLink]="['.//actionPanel:panel1/node7']">Go Next</a> -->
        <a [routerLink]="['./']"
        [queryParams]="{ panelNodeId: 'node7'}" queryParamsHandling="merge"
        >Go Next</a>
        <a [routerLink]="['./']"
        [queryParams]="{ panelNodeId: 'node1'}" queryParamsHandling="merge"
        >Go Next2</a>
    `
})
export class Node1Component {
    @Input() greeting: string;
    @Output() doWork = new EventEmitter();
    @Output() setFilter = new EventEmitter();
    @Output() resetFilter = new EventEmitter();
}
