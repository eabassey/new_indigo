import { indicatorColors } from './indicator-colors';
import * as moment from 'moment';
import { humaniseSeconds } from '@indigo/utilities';


export const get_indicator_color = (item, userRoles = [], comp) => {
  const color = userRoles.includes(item.state) ? indicatorColors[item.state] : 'grey';
  comp.indicator.color = color;
};

export const get_sla_time = (item, statesMap) => {
  const currentSLA = statesMap[item.state]?.sla_time;
  const actualTime = moment().diff(moment(item.state_change_date), 's');
  const result = (actualTime / currentSLA) * 100;
  if (result <= 80) {
    return {text: humaniseSeconds(actualTime), color: 'grey'};
  } else if (result >= 81 && result <= 100) {
    return {text: humaniseSeconds(actualTime), color: '#DAA520'};
  } else if (result >= 101) {
    return { text: humaniseSeconds(actualTime), color: 'red'};
  }

}
