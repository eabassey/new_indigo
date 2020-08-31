import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXCardModule } from './card/card.module';
import { FLXEntityCardModule } from './entity-card';
import { FLXActionableTableCardComponentModule } from './actionable-table-card';

@NgModule({
  imports: [CommonModule, FLXCardModule, FLXEntityCardModule, FLXActionableTableCardComponentModule],
  declarations: [],
  exports: [FLXEntityCardModule, FLXCardModule, FLXActionableTableCardComponentModule],
})
export class FLXCardsModule {}
