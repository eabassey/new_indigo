import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilderComponent } from './form-builder.component';
import { FieldBuilderComponent } from './field-builder/field-builder.component';
import { TextBoxComponent } from './atoms/textbox';
import { TextAreaInputComponent } from './atoms/textarea';
import { CheckBoxComponent } from './atoms/checkbox';

@NgModule({
  declarations: [
    FormBuilderComponent,
    FieldBuilderComponent,
    TextBoxComponent,
    TextAreaInputComponent,
    CheckBoxComponent
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormBuilderComponent]
})
export class DynamicFormsModule {}