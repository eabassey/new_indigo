import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FLXDropdownComponent } from './dropdown/dropdown.component';
import { ReactiveFormsModule, FormsModule as FM } from '@angular/forms';
import { FLXCheckboxComponent } from './checkbox/checkbox.component';
import { FLXRadioComponent } from './radio/radio.component';
import * as fromDragDrop from './drag-drop';
import { InlineSVGModule } from 'ng-inline-svg';
import { FLXInputTextModule } from './input-text/input-text.module';
import { FLXAppointmentSliderComponent } from './appointment-slider/appointment-slider.component';
import { FLXTimePickerSiderModule } from './time-picker-slider/time-picker-slider.module';
import { FLXLabelsModule } from '../labels';
import { FLXIconModule } from '../inline-icons';
import { FLXFormFieldModule } from './form-field/form-field.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FLXLabelsModule,
    FM,
    NgSelectModule,
    InlineSVGModule,
    FLXInputTextModule,
    FLXTimePickerSiderModule,
    FLXIconModule,
    FLXFormFieldModule,
  ],
  declarations: [FLXDropdownComponent, FLXRadioComponent, FLXAppointmentSliderComponent, FLXCheckboxComponent, ...fromDragDrop.directives],
  providers: [],
  exports: [
    FLXDropdownComponent,
    FLXRadioComponent,
    ReactiveFormsModule,
    FLXCheckboxComponent,
    FLXLabelsModule,
    FLXInputTextModule,
    FLXTimePickerSiderModule,
    FLXAppointmentSliderComponent,
    FLXFormFieldModule,
    ...fromDragDrop.directives,
  ],
})
export class FLXFormsModule {}
