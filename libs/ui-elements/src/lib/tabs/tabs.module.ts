import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXTabsComponent } from './tabs.component';
import { FLXHeadingsModule } from '../headings';

@NgModule({
  declarations: [FLXTabsComponent],
  imports: [CommonModule, FLXHeadingsModule],
  exports: [FLXTabsComponent],
})
export class FLXTabsModule {}
