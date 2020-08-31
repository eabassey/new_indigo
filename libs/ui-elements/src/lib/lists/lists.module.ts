import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXEntityListComponent, FLXEntityListModule } from './entity-list';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FLXEntityListModule],
  declarations: [],
  exports: [FLXEntityListModule],
})
export class FLXListsModule {}
