export interface ITimePicker {
  id: number;
  name: string;
}

export type SliderType = 'Before' | 'After' | 'Between' | 'At';

export interface IStartTime {
  startTime: {
    hours: number;
    minutes: number;
  };
}
