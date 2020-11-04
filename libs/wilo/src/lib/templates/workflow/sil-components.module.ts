import { NgModule } from "@angular/core";
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {UIElementsModule} from '@indigo/ui-elements';
import { PipesModule } from '@indigo/pipes';
import { NgxPaginationModule } from 'ngx-pagination';
import {WorkflowListComponent} from './workflow-list.component';
import {ClaimCardComponent} from './claim-card/claim-card.component';
import {JobCardComponent} from './job-card/job-card.component';

@NgModule({
  declarations: [
    WorkflowListComponent,
    ClaimCardComponent,
    JobCardComponent
  ],
  imports: [CommonModule, PipesModule, UIElementsModule.forRoot({environment: ''}),  RouterModule, ReactiveFormsModule, NgxPaginationModule],
  exports: [ReactiveFormsModule]
})
export class SilComponentsModule {}
