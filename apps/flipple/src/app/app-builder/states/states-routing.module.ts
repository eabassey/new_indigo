import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateConfigActivateComponent } from './state-config/state-config-activate/state-config-activate.component';
import { StateConfigDeactivateComponent } from './state-config/state-config-deactivate/state-config-deactivate.component';
import { StateConfigEventsComponent } from './state-config/state-config-events/state-config-events.component';
import { StateConfigServercallsComponent } from './state-config/state-config-servercalls/state-config-servercalls.component';
import { StateConfigServerqueriesComponent } from './state-config/state-config-serverqueries/state-config-serverqueries.component';
import { StateConfigSettingsComponent } from './state-config/state-config-settings/state-config-settings.component';
import { StateConfigComponent } from './state-config/state-config.component';
import { StatesEditComponent } from './states-edit/states-edit.component';
import { StatesListComponent } from './states-list/states-list.component';
import {StatesComponent} from './states.component';


const routes: Routes = [
  {
    path: '',
    component: StatesComponent,
    children: [
      {
        path: '',
        component: StatesListComponent
      },
      {
        path: 'new',
        component: StatesEditComponent
      },
      {
        path: ':stateId/edit',
        component: StatesEditComponent
      },
      {
        path: ':stateId/config',
        component: StateConfigComponent,
        children: [
            {
                path: '',
                redirectTo: 'settings',
                pathMatch: 'prefix'
            },
            {
                path: 'settings',
                component: StateConfigSettingsComponent
            },
            {
                path: 'activate-rules',
                component: StateConfigActivateComponent
            },
            {
                path: 'deactivate-rules',
                component: StateConfigDeactivateComponent
            },
            {
                path: 'server-calls',
                component: StateConfigServercallsComponent
            },
            {
                path: 'server-queries',
                component: StateConfigServerqueriesComponent
            },
            {
                path: 'events',
                component: StateConfigEventsComponent
            },
        ]
      },
      {
        path: ':stateId/nodes',
        loadChildren: () => import('../nodes/nodes.module').then(m => m.NodesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatesRoutingModule { }
