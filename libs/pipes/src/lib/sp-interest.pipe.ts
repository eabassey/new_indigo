import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spInterest'
})
export class SpInterestPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 1:
        return 'Accepted';
      case -1:
        return 'Declined';
      case 0:
        return 'Ignored';
      }
    }
}
