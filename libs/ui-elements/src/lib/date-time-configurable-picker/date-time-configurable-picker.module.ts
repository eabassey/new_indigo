import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXDateTimeConfigurablePickerComponent } from './date-time-configurable-picker.component';
import { FLXButtonsModule } from '../buttons/buttons.module';
import { FLXFormsModule } from '../forms/forms.module';
import { FLXTimePickerModule } from '../timepicker/timepicker.module';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { DateTimeTypePickerTriggerDirective } from './picker-directive/date-time-configurable-picker.directive';

@NgModule({
  declarations: [FLXDateTimeConfigurablePickerComponent, DateTimeTypePickerTriggerDirective],
  imports: [CommonModule, FLXButtonsModule, FLXFormsModule, FLXTimePickerModule, OverlayModule, PortalModule],
  exports: [FLXDateTimeConfigurablePickerComponent, DateTimeTypePickerTriggerDirective],
  providers: [],
})
export class DateTimeConfigurableModule {}
