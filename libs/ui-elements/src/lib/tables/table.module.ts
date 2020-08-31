import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXDynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { FLXHeadingsModule } from '../headings';

@NgModule({
  imports: [CommonModule, FLXHeadingsModule],
  declarations: [FLXDynamicTableComponent],
  exports: [FLXDynamicTableComponent],
  entryComponents: [FLXDynamicTableComponent],
})
export class FLXTableModule {}
