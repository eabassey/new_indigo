import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';

// import * as fromStore from '../store';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'stateName',
  pure: false,
})
export class StateNamePipe implements PipeTransform {
  transform(stateId: number, states: any): string {
    if (states.length > 0) {
      const current = states.find((currentState) => currentState.id === +stateId[0]);
      return current.description;
    }
    return 'NA';
  }
}
