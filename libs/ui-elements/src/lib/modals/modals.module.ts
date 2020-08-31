import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXModalComponent } from './modal/modal.component';
import { PipesModule } from '@indigo/pipes';
import { FLXButtonsModule } from '../buttons';
import { FLXHeadingsModule } from '../headings';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [CommonModule, FLXButtonsModule, PipesModule, FLXHeadingsModule, PortalModule, OverlayModule],
  declarations: [FLXModalComponent],
  exports: [FLXModalComponent]
})
export class FLXModalsModule {}
