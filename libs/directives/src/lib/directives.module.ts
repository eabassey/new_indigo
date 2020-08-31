import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HoverClickCopyDirective } from './hover-click-copy.directive';
import { InlineIconSvgDirective } from './inline-icon-svg.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [HoverClickCopyDirective, InlineIconSvgDirective],
  exports: [HoverClickCopyDirective, InlineIconSvgDirective],
})
export class FLXDirectivesModule {}
