import { NgModule } from '@angular/core';
import { FLXRatingComponent } from './rating.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [FLXRatingComponent],
  exports: [FLXRatingComponent],
})
export class FLXRatingModule {}
