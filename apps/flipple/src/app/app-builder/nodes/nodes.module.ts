import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodesRoutingModule } from './nodes-routing.module';
import { NodesComponent } from './nodes.component';
import { NodesDesignerComponent } from './nodes-designer/nodes-designer.component';
import { NodeActivateComponent } from './nodes-designer/node-activate/node-activate.component';
import { NodeGeneralComponent } from './nodes-designer/node-general/node-general.component';
import { NodeSettingsComponent } from './nodes-designer/node-settings/node-settings.component';
import { NodeDeactivateComponent } from './nodes-designer/node-deactivate/node-deactivate.component';
import { NodeServercallsComponent } from './nodes-designer/node-servercalls/node-servercalls.component';
import { NodeServerqueriesComponent } from './nodes-designer/node-serverqueries/node-serverqueries.component';
import { NodeEventsComponent } from './nodes-designer/node-events/node-events.component';
import { NodesListComponent } from './nodes-list/nodes-list.component';


@NgModule({
  declarations: [NodesComponent, NodesDesignerComponent, NodeActivateComponent, NodeGeneralComponent, NodeSettingsComponent, NodeDeactivateComponent, NodeServercallsComponent, NodeServerqueriesComponent, NodeEventsComponent, NodesListComponent],
  imports: [
    CommonModule,
    NodesRoutingModule
  ]
})
export class NodesModule { }
