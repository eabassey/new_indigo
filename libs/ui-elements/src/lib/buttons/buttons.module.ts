import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXButtonComponent } from './button/button.component';
import { FLXButtonGroupComponent } from './button-group/button-group.component';
import { FLXToggleButtonsComponent } from './button-toggle/button-toggle.component';
import { FLXAccordionButtonComponent } from './accordion-button/accordion-button.component';
import { FLXSvgButtonComponent } from './svg-button/svg-button.component';
import { FLXIconModule } from '../inline-icons';

@NgModule({
  imports: [CommonModule, FLXIconModule],
  declarations: [
    FLXButtonComponent,
    FLXButtonGroupComponent,
    FLXToggleButtonsComponent,
    FLXSvgButtonComponent,
    FLXAccordionButtonComponent,
  ],
  exports: [
    FLXButtonComponent,
    FLXButtonGroupComponent,
    FLXToggleButtonsComponent,
    FLXSvgButtonComponent,
    FLXAccordionButtonComponent,
  ],
  entryComponents: [FLXButtonComponent],
})
export class FLXButtonsModule {}
