import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FLXHeadingComponent } from './heading/heading.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FLXHeadingComponent],
  exports: [FLXHeadingComponent],
})
export class FLXHeadingsModule {}
