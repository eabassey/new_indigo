import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { UIElementsModule } from '@indigo/ui-elements';
// import { UICompositesModule } from '@indigo/ui-composites';
import { FLXSearchBannerComponent } from './search-banner.component';

@NgModule({
  declarations: [FLXSearchBannerComponent],
  exports: [FLXSearchBannerComponent],
  imports: [CommonModule,
    // UIElementsModule, UICompositesModule
  ],
  entryComponents: [FLXSearchBannerComponent]
})
export class SearchBannerModule {}
