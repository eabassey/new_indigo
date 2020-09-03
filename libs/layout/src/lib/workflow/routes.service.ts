import { Injectable, Inject } from '@angular/core';
import { Router, Route } from '@angular/router';
import { CLIENT_CONFIG, ClientConfig, AppConfig, FlexusActivatedGuard, FlexusDeactivateGuard } from '@wilo';
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
        // const routes: Route[] = [
        //     {
        //         path: '',
        //         redirectTo: this.clientConfig.startApp,
        //         pathMatch: 'full',
        //     },
        //     {
        //         path: ':app',
        //         children: [
        //             {
        //                 path: '',
        //                 redirectTo: this.clientConfig.apps[this.clientConfig.startApp].startState,
        //                 pathMatch: 'prefix'
        //             },
        //             {
        //                 path: ':state',
        //                 children: [
        //                     {
        //                         path: '',
        //                         // tslint:disable-next-line: max-line-length
        //                         redirectTo: this.clientConfig.apps[this.clientConfig.startApp].appStates[this.clientConfig.apps[this.clientConfig.startApp].startState].startNode,
        //                         pathMatch: 'prefix'
        //                     },
        //                     {
        //                         path: ':node',
        //                         component: WorkflowLayoutComponent
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // ];
        // Render start App
        // this.router.config.unshift(...routes);
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
                    canActivate: [FlexusActivatedGuard],
                    canDeactivate: [FlexusDeactivateGuard],
                    data: {...app },
                    children: [
                        {path: '', redirectTo: app.startState, pathMatch: 'prefix'},

                        ...Object.entries(app.appStates).map(([stateKey, state]) => {
                                return {
                                    path: stateKey,
                                    component: WorkflowStateComponent, // app.stateComp, // this.stateBase, // FlexusStateComponent,
                                    data: {...state },
                                    canActivate: [FlexusActivatedGuard],
                                    canDeactivate: [FlexusDeactivateGuard],
                                    children: [
                                        {path: '', redirectTo: state.startNode, pathMatch: 'prefix'},
                                        ...Object.entries(state.nodes).map(([nodeKey, node]) => {
                                                return {
                                                    path: nodeKey,
                                                    component: WorkflowNodeComponent, // app.nodeComp, // this.nodeBase, // FlexusNodeComponent,
                                                    canActivate: [FlexusActivatedGuard],
                                                    canDeactivate: [FlexusDeactivateGuard],
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
