import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXCardModule } from './card/card.module';

@NgModule({
  imports: [CommonModule, FLXCardModule],
  declarations: [],
  exports: [FLXCardModule],
})
export class FLXCardsModule {}
