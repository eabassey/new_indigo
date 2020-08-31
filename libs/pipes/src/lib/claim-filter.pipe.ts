import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'claimFilter',
})
export class FLXClaimFilterPipe implements PipeTransform {
  transform(value: any, ...args: any) {
    if (value !== null && value !== '') {
      switch (args[0]) {
        case 'state':
          const state = args[1].states;
          return state[value]['description'];

        case 'appointment_type':
          const appointmentTypes = args[1].appointmentTypes;
          return appointmentTypes[value - 1]['name'];

        case 'skill':
          const skills = args[1].skills;
          return skills[value]['name'];

        case 'sp':
          const sp = args[1].sps;
          return sp[value]['name'];

        case 'roles':
          const roles = args[1].roles;
          return roles[value[0]]['description'] + ',' + roles[value[1]]['description'];

        default:
          return value;
      }
    } else {
      return 'Unspecified';
    }
  }
}
