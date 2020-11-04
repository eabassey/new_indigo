import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatesRoutingModule } from './states-routing.module';
import { StatesComponent } from './states.component';
import { StatesListComponent } from './states-list/states-list.component';
import { StatesEditComponent } from './states-edit/states-edit.component';
import { StateConfigComponent } from './state-config/state-config.component';
import { StateConfigDeactivateComponent } from './state-config/state-config-deactivate/state-config-deactivate.component';
import { StateConfigEventsComponent } from './state-config/state-config-events/state-config-events.component';
import { StateConfigServercallsComponent } from './state-config/state-config-servercalls/state-config-servercalls.component';
import { StateConfigServerqueriesComponent } from './state-config/state-config-serverqueries/state-config-serverqueries.component';
import { StateConfigSettingsComponent } from './state-config/state-config-settings/state-config-settings.component';
import { StateConfigActivateComponent } from './state-config/state-config-activate/state-config-activate.component';


@NgModule({
  declarations: [StatesComponent, StatesListComponent, StatesEditComponent, StateConfigComponent, StateConfigDeactivateComponent, StateConfigEventsComponent, StateConfigServercallsComponent, StateConfigServerqueriesComponent, StateConfigSettingsComponent, StateConfigActivateComponent],
  imports: [
    CommonModule,
    StatesRoutingModule
  ]
})
export class StatesModule { }
