import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
// import * as fromStore from '../store';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'appointmentType',
  pure: false
})
export class AppointmentTypePipe implements PipeTransform {
  private appointmentTypeString: string = undefined;

  constructor(
    // private _store: Store<fromStore.SharedState>
  ) { }

  transform(appointmentTypeId: number): string {
    // this._store
    //   .select(fromStore.getAppointmentTypes)
    //   .pipe(
    //     map(appointmentTypes =>
    //       appointmentTypes.find(appType => appType.id === appointmentTypeId)
    //     )
    //   )
    //   .subscribe(appType => {
    //     if (appType) {
    //       this.appointmentTypeString = appType.name;
    //     } else {
    //       this.appointmentTypeString = '-';
    //     }
    //   });
    return this.appointmentTypeString;
  }
}
