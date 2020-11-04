import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NodeActivateComponent } from './nodes-designer/node-activate/node-activate.component';
import { NodeDeactivateComponent } from './nodes-designer/node-deactivate/node-deactivate.component';
import { NodeEventsComponent } from './nodes-designer/node-events/node-events.component';
import { NodeGeneralComponent } from './nodes-designer/node-general/node-general.component';
import { NodeServercallsComponent } from './nodes-designer/node-servercalls/node-servercalls.component';
import { NodeServerqueriesComponent } from './nodes-designer/node-serverqueries/node-serverqueries.component';
import { NodeSettingsComponent } from './nodes-designer/node-settings/node-settings.component';
import { NodesDesignerComponent } from './nodes-designer/nodes-designer.component';
import { NodesListComponent } from './nodes-list/nodes-list.component';
import { NodesComponent } from './nodes.component';

const routes: Routes = [
  {
    path: '',
    component: NodesComponent,
    children: [
      {
        path: '',
        component: NodesListComponent,
        children: [
          {
            path: ':nodeId',
            component: NodesDesignerComponent,
            children: [
              {
                path: '',
                redirectTo: 'general',
                pathMatch: 'prefix'
            },
            {
              path: 'general',
              component: NodeGeneralComponent
            },
            {
                path: 'settings',
                component: NodeSettingsComponent
            },
            {
                path: 'activate-rules',
                component: NodeActivateComponent
            },
            {
                path: 'deactivate-rules',
                component: NodeDeactivateComponent
            },
            {
                path: 'server-calls',
                component: NodeServercallsComponent
            },
            {
                path: 'server-queries',
                component: NodeServerqueriesComponent
            },
            {
                path: 'events',
                component: NodeEventsComponent
            },
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NodesRoutingModule { }
