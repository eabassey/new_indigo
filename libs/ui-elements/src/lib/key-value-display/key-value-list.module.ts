import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FLXKeyValueListComponent } from './key-value-list.component';
import { PipesModule } from '@indigo/pipes';
import { FLXHeadingsModule } from '../headings';
import { FLXGlowLineModule } from '../glow-line';
// import { ERLabelsModule } from '../labels';

@NgModule({
  imports: [CommonModule, PipesModule, FLXHeadingsModule, FLXGlowLineModule],
  declarations: [FLXKeyValueListComponent],
  entryComponents: [FLXKeyValueListComponent],
  exports: [FLXKeyValueListComponent]
})
export class FLXKeyValueListModule {}
