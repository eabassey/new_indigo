import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WorkflowActionPanelComponent } from './workflow-action-panel.component';
import { WorkflowAppComponent } from './workflow-app.component';
import { WorkflowLayoutComponent } from './workflow-layout.component';
import { WorkflowNodeComponent } from './workflow-node.component';
import { WorkflowStateComponent } from './workflow-state.component';
import { CommonModule } from '@angular/common';
import { WorkflowNodeFooterComponent } from './workflow-node-footer.component';

import { RouterModule } from '@angular/router';
import { AppMenuModule, SearchBannerModule } from './components';
import { ThemeModule } from './theming/theme.module';
import { blackoutTheme } from './theming/themes/blackout.theme';
import { middayTheme } from './theming/themes/midday.theme';
import { midnightTheme } from './theming/themes/midnight.theme';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FLXHeaderActionsComponent } from './components/header-actions/header-actions.component';
import { FLXAppBarComponent } from './components/app-bar/app-bar.component';
import { WorkflowPanelNodeComponent } from './workflow-panel-node.component';
import { DynamicModule } from 'ng-dynamic-component';
import {WiloModule} from '@wilo';
import { RoutesService } from './routes.service';
import { UIElementsModule } from '@indigo/ui-elements';


@NgModule({
    declarations: [
        WorkflowLayoutComponent,
        WorkflowAppComponent,
        WorkflowActionPanelComponent,
        WorkflowStateComponent,
        WorkflowNodeComponent,
        WorkflowPanelNodeComponent,
        WorkflowNodeFooterComponent,
        AppFooterComponent,
        FLXHeaderActionsComponent,
        FLXAppBarComponent
    ],
    imports: [
        CommonModule,
        WiloModule,
        NgxPaginationModule,
        ThemeModule,
        UIElementsModule,
        AppMenuModule,
        SearchBannerModule,
        DynamicModule,
        ThemeModule.forRoot({
          themes: [blackoutTheme, middayTheme, midnightTheme],
          active: 'blackout'
        }),
        RouterModule.forChild([]),
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        WorkflowLayoutComponent,
        WorkflowAppComponent,
        WorkflowActionPanelComponent,
        WorkflowStateComponent,
        WorkflowNodeComponent,
        WorkflowNodeFooterComponent
    ]
})
export class WorkflowLayoutModule {
  constructor(routesService: RoutesService) {}
}
