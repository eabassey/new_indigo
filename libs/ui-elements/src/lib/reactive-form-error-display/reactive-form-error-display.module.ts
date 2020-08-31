import { NgModule } from '@angular/core';
import { ReactiveFormErrorDisplayComponent } from './reactive-form-error-display.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@indigo/pipes';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, PipesModule],
  declarations: [ReactiveFormErrorDisplayComponent],
  exports: [ReactiveFormErrorDisplayComponent],
})
export class FLXReactiveFormsErrorDisplayModule {}
