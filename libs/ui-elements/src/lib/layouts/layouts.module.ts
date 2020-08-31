import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FLXTwoColumnOneFifthComponent } from './two-column-one-fifth/two-column-one-fifth.component';
import { FLXFlexContainerComponent } from './flex-container/flex-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FLXFlexContainerComponent, FLXTwoColumnOneFifthComponent],
  exports: [FLXFlexContainerComponent, FLXTwoColumnOneFifthComponent]
})
export class FLXLayoutsModule {}
