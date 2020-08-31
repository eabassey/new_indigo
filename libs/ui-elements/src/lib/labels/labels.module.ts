import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FLXLabelComponent } from './label/label.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FLXLabelComponent],
  exports: [FLXLabelComponent],
  entryComponents: [FLXLabelComponent],
})
export class FLXLabelsModule {}
