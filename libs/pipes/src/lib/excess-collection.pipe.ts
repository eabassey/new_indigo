import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excessCollection'
})
export class ExcessCollectionPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    let excessCollectionString: string;
    switch (value) {
      case 1:
        excessCollectionString = 'Standard Insurance to collect excess';
        break;
      case 2:
        if (args === 1) {
          excessCollectionString = 'Team Leader to collect excess';
        } else {
          excessCollectionString = 'SP Handler to collect excess';
        }
        break;
    }
    return excessCollectionString;
  }

}
