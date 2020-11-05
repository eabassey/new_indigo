import { Component, OnInit } from '@angular/core';
import { CoreServices, RulesService, StateBase } from '@wilo';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
    selector: 'workflow-state',
    template: `
    <section
        class="app-shell-container action-panel-visible"
        #appShell
        [ngClass]="[expandActionPanel ? 'action-panel-expand' : 'action-panel-collapse']"
    >
        <section class="module-wrapper">
        <flx-app-bar></flx-app-bar>
        <section class="module-container">
        <ng-container *ngIf="state?.showTabs">
            <flx-tabs
              [tabs]="dynamicTabs"
              [currentStep$]="currentTab$"
              [externalPages]="true"
              (outputEventStream)="selectTab($event)"
            ></flx-tabs>
        </ng-container>
            <router-outlet></router-outlet>
        </section>
        <app-footer *ngIf="!state?.layout?.hideFooter"></app-footer>
        </section>
    </section>
    <ng-container *ngIf="!state?.layout?.hideActionPanel">
            <div class="action-panel-container">
                <aside
                    class="action-panel action-panel__padding"
                    #actionPanel
                    [ngClass]="{
                    'action-panel-expand': expandActionPanel,
                    'action-panel-closed': !expandActionPanel}"
                >
                <workflow-action-panel *ngIf="expandActionPanel" [activePanel]="activePanel"></workflow-action-panel>
                </aside>
                <nav class="action-panel-navigation">
                    <div class="top-icons">
                    <div class="avatar-container">
                        <div class="avatar">HJ</div>
                    </div>
                    <a *ngFor="let action of panelActions"
                    [routerLink]="[]"
                    [queryParams]="{ expandActionPanel: expandActionPanel, panelId: clickedActionPanel, panelNodeId: activePanel?.startNode}" queryParamsHandling="merge">
                        <flx-icon
                            [type]="action?.icon"
                            [isActive]="clickedActionPanel === action.id ? true : false"
                            active="primary"
                            class="action-panel-button"
                            use="action-panel"
                            hover="primary"
                            [instruction]="action?.instruction"
                            (click)="clickPanel(action.id)"
                        >
                            {{ action.icon }}
                        </flx-icon>
                    </a>
                    </div>
                    <div class="bottom-icons">
                        <!-- -->
                    </div>
                </nav>
                </div>



            </ng-container>
    `,
    styleUrls: ['workflow-state.component.scss']
})
export class WorkflowStateComponent extends StateBase {
  currentTab$;

    constructor(svc: CoreServices, route: ActivatedRoute, rulesService: RulesService) {
        super(svc, route, rulesService);

      }

  selectTab(tab) {

  }
}
