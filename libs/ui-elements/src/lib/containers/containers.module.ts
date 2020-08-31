import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FLXScrollContainerModule } from './scroll-container/scroll-container.module';

@NgModule({
  imports: [CommonModule, FLXScrollContainerModule],
  exports: [FLXScrollContainerModule],
})
export class FLXContainerModule {}
