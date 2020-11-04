import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppBuilderRoutingModule } from './app-builder-routing.module';
import { AppBuilderComponent } from './app-builder.component';


@NgModule({
  declarations: [AppBuilderComponent],
  imports: [
    CommonModule,
    AppBuilderRoutingModule
  ]
})
export class AppBuilderModule { }
