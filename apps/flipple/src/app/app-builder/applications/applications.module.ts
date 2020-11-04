import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { ApplicationsListComponent } from './applications-list/applications-list.component';
import { ApplicationConfigComponent } from './application-config/application-config.component';
import { ApplicationConfigSettingsComponent } from './application-config/application-config-settings/application-config-settings.component';
import { ApplicationConfigActivateComponent } from './application-config/application-config-activate/application-config-activate.component';
import { ApplicationConfigDeactivateComponent } from './application-config/application-config-deactivate/application-config-deactivate.component';
import { ApplicationConfigServercallsComponent } from './application-config/application-config-servercalls/application-config-servercalls.component';
import { ApplicationConfigServerqueriesComponent } from './application-config/application-config-serverqueries/application-config-serverqueries.component';
import { ApplicationConfigEventsComponent } from './application-config/application-config-events/application-config-events.component';
import { ApplicationEditComponent } from './application-edit/application-edit.component';


@NgModule({
  declarations: [ApplicationsComponent, ApplicationsListComponent, ApplicationEditComponent, ApplicationConfigComponent, ApplicationConfigSettingsComponent, ApplicationConfigActivateComponent, ApplicationConfigDeactivateComponent, ApplicationConfigServercallsComponent, ApplicationConfigServerqueriesComponent, ApplicationConfigEventsComponent],
  imports: [
    CommonModule,
    ApplicationsRoutingModule
  ]
})
export class ApplicationsModule { }
