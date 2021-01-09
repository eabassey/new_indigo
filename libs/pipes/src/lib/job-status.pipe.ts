import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobStatus'
})
export class JobStatusPipe implements PipeTransform {

  transform(value: string | number): string {

    switch (value) {
      case 1:
      case 101:
      case 5:
      case 105:
      case 'None': {
        return 'Valid Claim';
      }
      case 2:
      case 102: {
        return 'Repudiated Job';
      }
      case 3:
      case 103: {
        return 'Private Work Job';
      }
      case 4:
      case 104: {
        return 'Job Cancelled';
      }
      case 6:
      case 106: {
        return 'Warranty Claim';
      }
      case '-': {
        return '-';
      }
      default:
        return '';
    }
  }

}
