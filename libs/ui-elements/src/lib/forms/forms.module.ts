import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule as FM } from '@angular/forms';
import { FLXCheckboxComponent } from './checkbox/checkbox.component';
import { FLXRadioComponent } from './radio/radio.component';
import * as fromDragDrop from './drag-drop';
import { InlineSVGModule } from 'ng-inline-svg';
import { FLXInputTextModule } from './input-text/input-text.module';
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
    FLXIconModule,
    FLXFormFieldModule,
  ],
  declarations: [ FLXRadioComponent, FLXCheckboxComponent, ...fromDragDrop.directives],
  providers: [],
  exports: [
    FLXRadioComponent,
    ReactiveFormsModule,
    FLXCheckboxComponent,
    FLXLabelsModule,
    FLXInputTextModule,
    FLXFormFieldModule,
    ...fromDragDrop.directives,
  ],
})
export class FLXFormsModule {}
