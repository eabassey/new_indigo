import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXAlertComponent } from './alert/alert.component';
import { FLXIconModule } from '../inline-icons';

@NgModule({
  imports: [CommonModule, FLXIconModule],
  declarations: [FLXAlertComponent],
  exports: [FLXAlertComponent],
})
export class FLXAlertsModule {}
