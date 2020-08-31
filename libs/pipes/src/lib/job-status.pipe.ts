import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobStatus'
})
export class JobStatusPipe implements PipeTransform {

  transform(value: string | number): string {
    let jobStatus: string;

    switch (value) {
      case 1:
      case 101:
      case 5:
      case 105:
      case 'None': {
        jobStatus = 'Valid Claim';
        break;
      }
      case 2:
      case 102: {
        jobStatus = 'Repudiated Job';
        break;
      }
      case 3:
      case 103: {
        jobStatus = 'Private Work Job';
        break;
      }
      case 4:
      case 104: {
        jobStatus = 'Job Cancelled';
        break;
      }
      case 6:
      case 106: {
        jobStatus = 'Warranty Claim';
        break;
      }
      case '-': {
        jobStatus = '-';
        break;
      }
    }
    return jobStatus;
  }

}
