import { NgModule } from '@angular/core';
import { UIElementsModule } from '@indigo/ui-elements';
import { CommonModule } from '@angular/common';
import { FLXAppMenuComponent } from './app-menu.component';
import { AppMenuOverlayService } from './app-menu.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { InlineSVGModule,  } from 'ng-inline-svg';

@NgModule({
  imports: [
    CommonModule,
    // environment.appShellFeatures.includes(HeaderActionsModule) && HeaderActionsModule,
    UIElementsModule,
    InlineSVGModule,
    OverlayModule
  ],
  declarations: [FLXAppMenuComponent],
  exports: [FLXAppMenuComponent],
  providers: [AppMenuOverlayService],
  entryComponents: [FLXAppMenuComponent]
})
export class AppMenuModule {}
