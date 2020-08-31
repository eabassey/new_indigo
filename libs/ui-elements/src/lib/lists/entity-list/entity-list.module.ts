import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXEntityListComponent } from './entity-list.component';
import { FLXEntityCardModule } from '../../cards/entity-card';

@NgModule({
  imports: [CommonModule, FLXEntityCardModule],
  declarations: [FLXEntityListComponent],
  exports: [FLXEntityListComponent],
})
export class FLXEntityListModule {}
