import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXTimePickerSiderComponent } from './time-picker-slider.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FLXTimePickerSiderComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FLXTimePickerSiderComponent],
  providers: [],
})
export class FLXTimePickerSiderModule {}
