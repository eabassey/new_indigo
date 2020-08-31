import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXSelectListComponent } from './select-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FLXFormsModule } from '../forms';
import { FLXHeadingsModule } from '../headings';
import { FLXGlowLineModule } from '../glow-line';

@NgModule({
  declarations: [FLXSelectListComponent],
  imports: [CommonModule, ReactiveFormsModule, FLXFormsModule, FLXHeadingsModule, FLXGlowLineModule],
  exports: [FLXSelectListComponent],
  entryComponents: [FLXSelectListComponent]
})
export class FLXSelectListModule {}
