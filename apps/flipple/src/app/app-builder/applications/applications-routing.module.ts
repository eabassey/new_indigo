import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApplicationsComponent} from './applications.component';
import {ApplicationsListComponent} from './applications-list/applications-list.component';
import { ApplicationConfigComponent } from './application-config/application-config.component';
import { ApplicationConfigSettingsComponent } from './application-config/application-config-settings/application-config-settings.component';
import { ApplicationConfigActivateComponent } from './application-config/application-config-activate/application-config-activate.component';
import { ApplicationConfigDeactivateComponent } from './application-config/application-config-deactivate/application-config-deactivate.component';
import { ApplicationConfigServercallsComponent } from './application-config/application-config-servercalls/application-config-servercalls.component';
import { ApplicationConfigServerqueriesComponent } from './application-config/application-config-serverqueries/application-config-serverqueries.component';
import { ApplicationConfigEventsComponent } from './application-config/application-config-events/application-config-events.component';
import {ApplicationEditComponent } from './application-edit/application-edit.component';

const routes: Routes = [
    {
        path: '',
        component: ApplicationsComponent,
        children: [
            {
                path: '',
                component: ApplicationsListComponent
            },
            {
                path: 'new',
                component: ApplicationEditComponent
            },
            {
                path: ':appId/edit',
                component: ApplicationEditComponent
            },
            {
                path: ':appId/config',
                component: ApplicationConfigComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'settings',
                        pathMatch: 'prefix'
                    },
                    {
                        path: 'settings',
                        component: ApplicationConfigSettingsComponent
                    },
                    {
                        path: 'activate-rules',
                        component: ApplicationConfigActivateComponent
                    },
                    {
                        path: 'deactivate-rules',
                        component: ApplicationConfigDeactivateComponent
                    },
                    {
                        path: 'server-calls',
                        component: ApplicationConfigServercallsComponent
                    },
                    {
                        path: 'server-queries',
                        component: ApplicationConfigServerqueriesComponent
                    },
                    {
                        path: 'events',
                        component: ApplicationConfigEventsComponent
                    }
                ]
            },
            {
                path: ':appId/states',
                loadChildren: () => import('../states/states.module').then(m => m.StatesModule)
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
