import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FLXPanelComponent } from './panel/panel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FLXPanelComponent],
  exports: [FLXPanelComponent],
})
export class FLXPanelsModule {}
