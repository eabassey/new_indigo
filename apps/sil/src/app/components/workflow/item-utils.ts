import { indicatorColors } from './indicator-colors';
import * as moment from 'moment';
import { humaniseSeconds } from '@indigo/utilities';


export const get_indicator_color = (item: any, editStates: any) => {
  const color = editStates.includes(item.state) ? indicatorColors[item.state] : 'grey';
  return color;
};

export const get_sla_time = (item: any, statesMap: any) => {
  const currentSLA = statesMap[item.state]?.sla_time;
  const actualTime = moment().diff(moment(item.state_change_date), 's');
  const result = (actualTime / currentSLA) * 100;
  if (result <= 80) {
    return {text: humaniseSeconds(actualTime), color: 'grey'};
  } else if (result >= 81 && result <= 100) {
    return {text: humaniseSeconds(actualTime), color: '#DAA520'};
  } else if (result >= 101) {
    return { text: humaniseSeconds(actualTime), color: 'red'};
  }else {
    return { text: humaniseSeconds(actualTime), color: 'red'};
  }

}


export const getText = (userCanEdit: boolean, userRole: any, instructions: any) => {
  const instructionText = userCanEdit
      ? (instructions && instructions.editRoles[userRole]) || (instructions && instructions.editRoles[0]) || ''
      : (instructions && instructions.viewRoles[userRole]) || (instructions && instructions.viewRoles[0]) || '';
      return instructionText;
}
