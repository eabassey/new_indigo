import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FLXProgressComponent } from './progress/progress.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FLXProgressComponent],
  exports: [FLXProgressComponent],
})
export class FLXProgressModule {}
