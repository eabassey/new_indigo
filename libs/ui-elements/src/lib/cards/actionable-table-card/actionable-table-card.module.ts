import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { FLXActionableTableCardComponent } from './actionable-table-card.component';

@NgModule({
  imports: [CommonModule, InlineSVGModule],
  declarations: [FLXActionableTableCardComponent],
  exports: [FLXActionableTableCardComponent],
  providers: [],
})
export class FLXActionableTableCardComponentModule {}
