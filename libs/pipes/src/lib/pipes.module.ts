import { NgModule } from '@angular/core';
import { AppointmentTypePipe } from './appointment-type.pipe';
import { FLXCallFilterPipe } from './call-filter.pipe';
import { FLXClaimFilterPipe } from './claim-filter.pipe';
import { ExcessCollectionPipe } from './excess-collection.pipe';
import { FLXFromBooleanPipe } from './fromBoolean.pipe';
import { FLXFromCamelPipe } from './fromCamel.pipe';
import { FLXFromDatePipe } from './fromDate.pipe';
import { FLXFromPascalPipe } from './fromPascal.pipe';
import { FLXFromSnakePipe } from './fromSnake.pipe';
import { JobStatusPipe } from './job-status.pipe';
import { FLXObjectKeysPipe } from './keys.pipe';
import { ObjectKeysPipe } from './object-keys.pipe';
import { PaymentMethodPipe } from './payment-method.pipe';
import { FLXProperEnglishPipe } from './properEnglish.pipe';
import { QuickFilterPipe } from './quickfilter.pipe';
import { SearchFilterPipe } from './search.pipe';
import { SpInterestPipe } from './sp-interest.pipe';
import { SpNamePipe } from './sp-name.pipe';
import { SpSkillNamePipe } from './sp-skill-name.pipe';
import { StateNamePipe } from './state-name.pipe';
import { TelephoneNumberPipe } from './telephone-number.pipe';
import { FLXToHuman } from './toHuman.pipe';
import { FLXObjectValuesPipe } from './values.pipe';
import { FLXRealEnglishPipe } from './realEnglish.pipe';

export const pipes: any[] = [
  AppointmentTypePipe,
  FLXCallFilterPipe,
  FLXClaimFilterPipe,
  ExcessCollectionPipe,
  FLXFromBooleanPipe,
  FLXFromCamelPipe,
  FLXFromDatePipe,
  FLXFromPascalPipe,
  FLXFromSnakePipe,
  JobStatusPipe,
  FLXObjectKeysPipe,
  ObjectKeysPipe,
  PaymentMethodPipe,
  FLXProperEnglishPipe,
  QuickFilterPipe,
  SearchFilterPipe,
  SpInterestPipe,
  SpNamePipe,
  SpSkillNamePipe,
  StateNamePipe,
  TelephoneNumberPipe,
  FLXToHuman,
  FLXObjectValuesPipe,
  FLXRealEnglishPipe
];
@NgModule({
  declarations: [
    AppointmentTypePipe,
    FLXCallFilterPipe,
    FLXClaimFilterPipe,
    ExcessCollectionPipe,
    FLXFromBooleanPipe,
    FLXFromCamelPipe,
    FLXFromDatePipe,
    FLXFromPascalPipe,
    FLXFromSnakePipe,
    JobStatusPipe,
    FLXObjectKeysPipe,
    ObjectKeysPipe,
    PaymentMethodPipe,
    FLXProperEnglishPipe,
    QuickFilterPipe,
    SearchFilterPipe,
    SpInterestPipe,
    SpNamePipe,
    SpSkillNamePipe,
    StateNamePipe,
    TelephoneNumberPipe,
    FLXToHuman,
    FLXObjectValuesPipe,
    FLXRealEnglishPipe
  ],
  exports: [
    AppointmentTypePipe,
    FLXCallFilterPipe,
    FLXClaimFilterPipe,
    ExcessCollectionPipe,
    FLXFromBooleanPipe,
    FLXFromCamelPipe,
    FLXFromDatePipe,
    FLXFromPascalPipe,
    FLXFromSnakePipe,
    JobStatusPipe,
    FLXObjectKeysPipe,
    ObjectKeysPipe,
    PaymentMethodPipe,
    FLXProperEnglishPipe,
    QuickFilterPipe,
    SearchFilterPipe,
    SpInterestPipe,
    SpNamePipe,
    SpSkillNamePipe,
    StateNamePipe,
    TelephoneNumberPipe,
    FLXToHuman,
    FLXObjectValuesPipe,
    FLXRealEnglishPipe
  ]
})
export class PipesModule {}
