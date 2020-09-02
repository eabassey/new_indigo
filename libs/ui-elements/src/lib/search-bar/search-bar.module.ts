import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';
// import { FLXAlertMessagesModule } from '@flexus/ui-composites';
import { FLXFormsModule, FLXButtonsModule,
  // FLXReactiveFormsErrorDisplayModule,
  FLXIconModule } from '@indigo/ui-elements';

@NgModule({
  imports: [CommonModule, FLXFormsModule, FLXButtonsModule,
    // FLXReactiveFormsErrorDisplayModule,
     FLXIconModule,
    //  FLXAlertMessagesModule
    ],
  declarations: [SearchBarComponent],
  exports: [SearchBarComponent],
})
export class FLXSearchBarModule {}
