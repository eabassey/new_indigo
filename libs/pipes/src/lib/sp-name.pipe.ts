import { map, take } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';

// import * as fromStore from '../store';

@Pipe({
  name: 'spName',
  pure: false,
})
export class SpNamePipe implements PipeTransform {
  transform(value: any, ...args): any {
    if (args.length > 0) {
      const current = args[0].find((c) => c.id === value[0]);
      return current.name;
    }
    return 'NA';
  }
}
