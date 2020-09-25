import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXTabsComponent } from './tabs.component';
import { FLXHeadingsModule } from '../headings';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FLXTabsComponent],
  imports: [CommonModule, FLXHeadingsModule, RouterModule],
  exports: [FLXTabsComponent],
})
export class FLXTabsModule {}
