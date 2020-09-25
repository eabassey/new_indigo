import { Component, OnInit } from '@angular/core';
import { CoreServices, StateBase } from '@wilo';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'workflow-state',
    template: `
    <ng-container *ngIf="state?.showTabs">
    <flx-tabs
      [tabs]="dynamicTabs"
      [currentStep$]="currentTab$"
      [externalPages]="true"
      (outputEventStream)="selectTab($event)"
    ></flx-tabs>
  </ng-container>
    <router-outlet></router-outlet>
      <app-footer></app-footer>
    `,
    styleUrls: ['workflow-state.component.scss']
})
export class WorkflowStateComponent extends StateBase {
  currentTab$;
    constructor(svc: CoreServices, route: ActivatedRoute) {
        super(svc, route);
      }

  selectTab(tab) {

  }
}
