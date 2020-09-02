import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';
import { FLXFormsModule } from '../forms';
import { FLXIconModule } from '../inline-icons';
import { FLXButtonsModule } from '../buttons';
// import { FLXAlertMessagesModule } from '@flexus/ui-composites';


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
