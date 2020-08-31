import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FLXListAtom } from './list.component';
import { FLXLayoutsModule } from '../layouts';

@NgModule({
  imports: [CommonModule, FLXLayoutsModule],
  declarations: [FLXListAtom],
  exports: [FLXListAtom],
})
export class FLXListAtomModule {}
