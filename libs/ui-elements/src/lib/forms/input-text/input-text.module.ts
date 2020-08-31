import { InlineSVGModule } from 'ng-inline-svg';
import { NgModule } from '@angular/core';
import { FLXInputTextComponent } from './input-text.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, InlineSVGModule],
  exports: [FLXInputTextComponent],
  declarations: [FLXInputTextComponent],
  providers: [],
})
export class FLXInputTextModule {}
