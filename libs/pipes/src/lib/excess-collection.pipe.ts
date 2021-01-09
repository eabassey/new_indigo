import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excessCollection'
})
export class ExcessCollectionPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    let excessCollectionString: string;
    switch (value) {
      case 1:
        return 'Standard Insurance to collect excess';
        break;
      case 2:
        if (args === 1) {
          return 'Team Leader to collect excess';
        } else {
          return 'SP Handler to collect excess';
        }
        break;
        default:
          return '';
    }
  }

}
