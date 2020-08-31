import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXCallLogComponent } from './call-log.component';
import { FLXGlowLineModule } from '../glow-line';

@NgModule({
  declarations: [FLXCallLogComponent],
  imports: [CommonModule, FLXGlowLineModule],
  exports: [FLXCallLogComponent]
})
export class FLXCallLogModule {}
