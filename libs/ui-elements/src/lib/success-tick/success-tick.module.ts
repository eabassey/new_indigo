import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FLXSuccessTickComponent } from './success-tick.component';
import { FLXHeadingsModule } from '../headings';
import { FLXDirectivesModule } from '@indigo/directives';

@NgModule({
  imports: [CommonModule, FLXHeadingsModule, FLXDirectivesModule],
  declarations: [FLXSuccessTickComponent],
  exports: [FLXSuccessTickComponent],
  entryComponents: [FLXSuccessTickComponent],
})
export class FLXSuccessTickModule {}

// @NgModule({
//   declarations: [ERCrossTickAtom],
//   imports: [CommonModule],
//   exports: [ERCrossTickAtom],
//   providers: [],
// })
// export class ERCrossTickModule {}

// @NgModule({
//     imports: [CommonModule, FLXFormsModule, FLXButtonsModule, FLXReactiveFormsErrorDisplayModule, FLXIconModule],
//     declarations: [SearchBarComponent],
//     exports: [SearchBarComponent],
//   })
//   export class FLXSuccessTick {}
