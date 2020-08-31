import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXNestedObjectKeyValueListComponent } from './nested-object-key-value-list.component';
import { FLXHeadingsModule } from '../headings';
import { FLXKeyValueListModule } from '../key-value-display';
import { PipesModule } from '@indigo/pipes';

@NgModule({
  declarations: [FLXNestedObjectKeyValueListComponent],
  entryComponents: [FLXNestedObjectKeyValueListComponent],

  imports: [CommonModule, PipesModule, FLXKeyValueListModule, FLXHeadingsModule],
  exports: [FLXNestedObjectKeyValueListComponent],
})
export class FLXNestedObjectKeyValueListModule {}
