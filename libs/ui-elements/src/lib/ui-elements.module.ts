import { NgModule } from '@angular/core';
import { FLXAlertsModule } from './alerts';
import { FLXButtonComponent, FLXButtonsModule } from './buttons';
import { FLXTextareaModule } from './forms/textarea';
import { FLXYesNoModule } from './yes-no';
import { FLXFormsModule } from './forms';
import { FLXHeadingsModule } from './headings';
import { FLXLayoutsModule } from './layouts';
import { FLXProgressModule } from './progress';
import { FLXIconModule } from './inline-icons';
import { FLXRatingModule } from './rating';
import { FLXPanelsModule } from './panels';
import { FLXLoadingSpinnerModule } from './loading-spinner';
import { FLXLoaderModule } from './loader';
import { FLXLabelsModule } from './labels';
import { FLXGlowLineModule } from './glow-line';
import { FLXTabsModule } from './tabs';
import { FLXIndicatorModule } from './indicator';
import { FLXCardsModule } from './cards';
import { FLXSuccessTickModule } from './success-tick/success-tick.module';
import { FLXTableModule } from './tables';
import { FLXModalsModule } from './modals';
import { FLXNoResultsModule } from './no-results/no-results.module';
import { FLXNotesModule } from './notes/notes.module';
import { FLXScrollContainerModule } from './containers/scroll-container/scroll-container.module';
import { FLXSelectListModule } from './select-list';
import { FLXLoadingSpinnerInlineModule } from './loading-spinner-inline';
import { FLXCallLogModule } from './call-log';
import {FLXSearchBarModule} from './search-bar';

export const UIElements: any[] = [
  FLXModalsModule,
  FLXAlertsModule,
  FLXScrollContainerModule,
  FLXButtonsModule,
  FLXFormsModule,
  FLXHeadingsModule,
  FLXIconModule,
  FLXLabelsModule,
  FLXLayoutsModule,
  FLXLoaderModule,
  FLXLoadingSpinnerModule,
  FLXLoadingSpinnerInlineModule,
  FLXPanelsModule,
  FLXProgressModule,
  FLXRatingModule,
  FLXSelectListModule,
  FLXTextareaModule,
  FLXYesNoModule,
  FLXSuccessTickModule,
  FLXGlowLineModule,
  FLXTabsModule,
  FLXIndicatorModule,
  FLXCardsModule,
  FLXTableModule,
  FLXNoResultsModule,
  FLXNotesModule,
  FLXScrollContainerModule,
  FLXCallLogModule,
  // FLXSearchBarModule
];

@NgModule({
  imports: [...UIElements],
  exports: [...UIElements, FLXSearchBarModule],
  entryComponents: []
})
export class UIElementsModule {
  static forRoot(config: any) {
    return {
      ngModule: UIElementsModule,
      providers: [{ provide: 'environment', useValue: config.environment }]
    };
  }
}
