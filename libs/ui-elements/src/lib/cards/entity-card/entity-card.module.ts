import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXEntityCardComponent } from './entity-card.component';
import { FLXButtonsModule } from '../../buttons';
import { InlineSVGModule } from 'ng-inline-svg';
import { FLXIndicatorModule } from '../../indicator';

@NgModule({
  imports: [CommonModule, FLXButtonsModule, InlineSVGModule, FLXIndicatorModule],
  declarations: [FLXEntityCardComponent],
  exports: [FLXEntityCardComponent],
  providers: []
})
export class FLXEntityCardModule {}
