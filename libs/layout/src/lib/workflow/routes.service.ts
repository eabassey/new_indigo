import { Injectable, Inject } from '@angular/core';
import { Router, Route } from '@angular/router';
import { CLIENT_CONFIG, ClientConfig, AppConfig, ActivatedGuard, DeactivateGuard } from '@wilo';
import { WorkflowLayoutComponent } from './workflow-layout.component';
import { WorkflowAppComponent } from './workflow-app.component';
import { WorkflowStateComponent } from './workflow-state.component';
import { WorkflowNodeComponent } from './workflow-node.component';


@Injectable({providedIn: 'root'})
export class RoutesService {
    constructor(
        @Inject(CLIENT_CONFIG) private clientConfig: ClientConfig,
        private router: Router
    ) {
        this.router.config.unshift({path: '', redirectTo: this.clientConfig.startApp, pathMatch: 'full'});
        this.generateAppRoutes(this.clientConfig.apps);
    }


    generateAppRoutes(apps: {[id: string]: AppConfig}) {
        Object.entries(apps).forEach(([appKey, app]) => {
            this.router.config.unshift(
                // {path: 'implicit/callback', component: OktaCallbackComponent},
                {
                    path: appKey,
                    component: WorkflowAppComponent, // app.appComp, // this.appBase,  // FlexusAppComponent,
                    canActivate: [ActivatedGuard, ...(app.canActivate ? app.canActivate : [])],
                    canDeactivate: [DeactivateGuard, ...(app.canDeactivate ? app.canDeactivate : [])],
                    data: {...app },
                    children: [
                        {path: '', redirectTo: app.startState, pathMatch: 'prefix'},

                        ...Object.entries(app.appStates).map(([stateKey, state]: [string, any]) => {
                                return {
                                    path: stateKey,
                                    component: WorkflowStateComponent, // app.stateComp, // this.stateBase, // FlexusStateComponent,
                                    data: {...state },
                                    canActivate: [ActivatedGuard, ...(state.canActivate ? state.canActivate : [])],
                                    canDeactivate: [DeactivateGuard, ...(state.canDeactivate ? state.canDeactivate : [])],
                                    children: [
                                        {path: '', redirectTo: state.startNode, pathMatch: 'prefix'},
                                        ...Object.entries(state.nodes).map(([nodeKey, node]: [string, any]) => {
                                                return {
                                                    path: nodeKey,
                                                    component: WorkflowNodeComponent, // app.nodeComp, // this.nodeBase, // FlexusNodeComponent,
                                                    canActivate: [ActivatedGuard, ...(node.canActivate ? node.canActivate : [])],
                                                    canDeactivate: [DeactivateGuard, ...(node.canDeactivate ? node.canDeactivate : [])],
                                                    data: {...node }
                                                } as Route;
                                            })
                                    ]
                                } as Route;
                        })
                    ]
                }
            );
        });
    }
}
