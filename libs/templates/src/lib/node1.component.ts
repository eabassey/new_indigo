import { Component, Input, Output, EventEmitter } from "@angular/core";



@Component({
    selector: 'node1',
    template: `
    <div>
    Node1 stuff: {{greeting}}
        <button (click)="doWork.emit('workings')">doWork</button>
        <button (click)="setFilter.emit({filter_top: 8404})">Filter Top</button>
        <button (click)="setFilter.emit({filter_down: 8457})">Filter Down</button>
        <button (click)="resetFilter.emit()">Reset Filter</button>
        <a href="/home">Go Home</a>
        <!-- <a [routerLink]="['.//actionPanel:panel1/node7']">Go Next</a> -->
        <a [routerLink]="['./']"
        [queryParams]="{ panelNodeId: 'node7'}" queryParamsHandling="merge"
        >Go Next</a>
        <a [routerLink]="['./']"
        [queryParams]="{ panelNodeId: 'node1'}" queryParamsHandling="merge"
        >Go Next2</a>
    </div>
    `
})
export class Node1Component {
    @Input() greeting!: string;
    @Output() doWork = new EventEmitter();
    @Output() setFilter = new EventEmitter();
    @Output() resetFilter = new EventEmitter();
}
