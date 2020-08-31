import { Observable } from 'rxjs';

export interface DynamicButton {
  // dynamic_btn_position_left: boolean;
  dynamic_btn_name: string;
  dynamic_btn_eventType: string;
  dynamic_btn_position: Position; // Position on the bottom bar
  dynamic_btn_disable: boolean;
  // the bellow is not implemented in the dynamic footer template
  //  but it is important for the button rendering template
  color?: Color;
  size?: Size;
  depth?: Depth;
  width?: Width;
  shape?: Shape;
}
export interface DynamicButtonObs {
  // dynamic_btn_position_left: boolean;
  dynamic_btn_name: string;
  disabled$: Observable<boolean>;
  dynamic_btn_eventType: string;
  dynamic_btn_position: Position; // Position on the bottom bar
  color?: Color;
  size?: Size;
  width?: Width;
  shape?: Shape;
}

export enum Color {
  'default' = 'default',
  'primary' = 'primary',
  'secondary' = 'secondary',
  'success' = 'success',
  'alert' = 'alert',
  'warn' = 'warn',
  'danger' = 'danger',
}
export enum Size {
  'default' = 'default',
  'small' = 'small',
  'medium' = 'medium',
  'large' = 'large',
}
export enum Depth {
  'dp1' = 'dp1',
  'dp2' = 'dp2',
  'dp3' = 'dp3',
  'dp4' = 'dp4',
  'dp5' = 'dp5',
  'dp6' = 'dp6',
  'dp7' = 'dp7',
  'dp8' = 'dp8',
}
export enum Width {
  'block' = 'block',
  'inline' = 'inline',
}
export enum Shape {
  'none' = '',
  'rounded' = 'rounded',
}
export enum Position {
  'left' = 'left',
  'middle' = 'middle',
  'right' = 'right',
}
