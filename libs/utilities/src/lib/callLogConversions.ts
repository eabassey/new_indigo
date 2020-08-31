import * as moment from 'moment';

export const direction = [{ value: 3, display: 'Out-bound' }, { value: 2, display: 'In-bound' }, { value: 1, display: 'N/A' }];
export const reason = [{ value: 1, display: 'Value' }, { value: 2, display: 'Failure' }, { value: 3, display: 'Waste' }];
export const channel = [
  { value: 2, display: 'N/A' },
  { value: 3, display: 'Phone' },
  { value: 4, display: 'Email' },
  { value: 5, display: 'WhatsApp' },
  { value: 6, display: 'SMS' },
];

export function transformCallLog<T>(log: {
  reason: number;
  new_reason: string;
  direction: number;
  new_direction: string;
  channel: number;
  new_channel: string;
  date: string;
  time: string;
}) {
  log.date = moment(log['timestamp']).format(moment.HTML5_FMT.DATE);
  log.time = moment(log['timestamp']).format(moment.HTML5_FMT.TIME);

  reason.forEach((res) => {
    if (res.value === log.reason) log.new_reason = res.display;
  });
  direction.forEach((dir) => {
    if (dir.value === log.direction) log.new_direction = dir.display;
  });
  channel.forEach((chan) => {
    if (chan.value === log.channel) log.new_channel = chan.display;
  });

  return log;
}
