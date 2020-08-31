import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FLXScrollContainerComponent } from './scroll-container.component';
import { FLXGlowLineModule } from '../../glow-line/glow-line.module';

@NgModule({
  imports: [CommonModule, FLXGlowLineModule],
  exports: [FLXScrollContainerComponent],
  declarations: [FLXScrollContainerComponent],
})
export class FLXScrollContainerModule {}
