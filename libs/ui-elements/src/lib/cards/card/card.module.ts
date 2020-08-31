import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXCardBodyComponent } from './card-body/card-body.component';
import { FLXCardExpansionComponent } from './card-expansion/card-expansion.component';
import { FLXCardHeaderComponent } from './card-header/card-header.component';
import { FLXCardFooterComponent } from './card-footer/card-footer.component';
import { FLXCardComponent } from './card-main/card.component';
import { FLXCardListComponent } from './card-list/card-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FLXCardBodyComponent,
    FLXCardExpansionComponent,
    FLXCardHeaderComponent,
    FLXCardFooterComponent,
    FLXCardComponent,
    FLXCardListComponent,
  ],
  exports: [FLXCardBodyComponent, FLXCardExpansionComponent, FLXCardHeaderComponent, FLXCardFooterComponent, FLXCardComponent, FLXCardListComponent],
  providers: [],
})
export class FLXCardModule {}
