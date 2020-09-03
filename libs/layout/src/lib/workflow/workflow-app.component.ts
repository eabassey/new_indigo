import { Component, ViewEncapsulation } from '@angular/core';
import { CoreServices, FlexusAppBase } from '@wilo';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';


@Component({
    selector: 'workflow-app',
    template: `
       <main>
            <section
                class="app-shell-container action-panel-visible"
                #appShell
                [ngClass]="[expandActionPanel ? 'action-panel-expand' : 'action-panel-collapse']"
            >
                <section class="module-wrapper">
                <flx-app-bar></flx-app-bar>
                <section class="module-container">
                  <router-outlet></router-outlet>
                    <!-- <workflow-state [state]="state" [node]="node"></workflow-state> -->
                </section>
                <app-footer></app-footer>
                </section>
            </section>
            <ng-container>
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
        </main>
    `,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['workflow-app.component.scss']
})
export class WorkflowAppComponent extends FlexusAppBase {

    constructor(svc: CoreServices, route: ActivatedRoute, router: Router) {
        super(svc, route, router);
    }
}
