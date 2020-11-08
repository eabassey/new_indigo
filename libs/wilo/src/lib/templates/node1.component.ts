import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ActionRule } from '../models';
import { RulesService } from '../rules.service';



@Component({
    selector: 'node1',
    template: `
    <div>
    Node1 stuff: {{greeting}}
        <button *ngFor="let but of filterButtons" (click)="handleRule(but.onClick)">{{but.buttonText}}</button>
        <!-- <button (click)="setFilter.emit({filter_top: 8404})">Filter Top</button>
        <button (click)="setFilter.emit({filter_down: 8457})">Filter Down</button>
        <button (click)="resetFilter.emit()">Reset Filter</button> -->
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
    @Input() greeting: string;
    @Input() filterButtons: {buttonText: string; onClick: ActionRule[]}[];
    @Output() doWork = new EventEmitter();
    @Output() setFilter = new EventEmitter();
    @Output() resetFilter = new EventEmitter();

    constructor(private rulesService: RulesService) {}

    handleRule(rules: ActionRule[]) {
      rules.forEach(rule => this.rulesService.renderActionRule(rule));
    }
}
