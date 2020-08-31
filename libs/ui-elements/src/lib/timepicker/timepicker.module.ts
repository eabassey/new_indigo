import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXTimePickerComponent } from './timepicker.component';
import { FLXFormsModule } from '../forms/forms.module';
import { FLXIconModule } from '../inline-icons';
import { FLXButtonsModule } from '../buttons';

@NgModule({
  imports: [CommonModule, FLXFormsModule, FLXButtonsModule, FLXIconModule],
  declarations: [FLXTimePickerComponent],
  exports: [FLXTimePickerComponent],
})
export class FLXTimePickerModule {}
