import { Observable, BehaviorSubject } from 'rxjs';
import { transformArrayToObject } from '@indigo/utilities';
import { DynamicButton, Color, Size, Width, Shape, Position, DynamicButtonObs, Depth } from './button.interfaces';
//  isObservable , test to see if a thing is an observable
type ButtonCreationArgumentsArray =
  | [string]
  | [string, boolean]
  | [string, boolean, string]
  | [string, boolean, string, Position]
  | [string, boolean, string, Position, Color]
  | [string, boolean, string, Position, Color, Size]
  | [string, boolean, string, Position, Color, Size, Depth]
  | [string, boolean, string, Position, Color, Size, Depth, Width]
  | [string, boolean, string, Position, Color, Size, Depth, Width, Shape];

export class DynamicButtonClass implements DynamicButton {
  public dynamic_btn_name: string;
  public dynamic_btn_eventType: string;
  public dynamic_btn_position: Position; // Position on the bottom bar
  public dynamic_btn_disable: boolean;
  public color?: Color;
  public size?: Size;
  public width?: Width;
  public shape?: Shape;

  processObject(values, defaults) {
    const obj = { ...defaults, ...values };
    const { dynamic_btn_name, dynamic_btn_eventType, dynamic_btn_position, dynamic_btn_disable, color, size, width, shape } = obj;

    this.dynamic_btn_name = dynamic_btn_name;
    this.dynamic_btn_eventType = dynamic_btn_eventType;
    this.dynamic_btn_position = dynamic_btn_position;
    this.dynamic_btn_disable = dynamic_btn_disable;
    this.color = color;
    this.size = size;
    this.width = width;
    this.shape = shape;
  }
  //  i want to be able to pass an object, or an array of arguments
  constructor(config: Partial<DynamicButton> | [ButtonCreationArgumentsArray]);
  constructor(name: string, disabled$: Observable<boolean>);
  // constructor(args: );
  constructor(...args: ButtonCreationArgumentsArray);
  constructor(...args) {
    const nameArr = ['dynamic_btn_name', 'dynamic_btn_disable', 'dynamic_btn_eventType', 'dynamic_btn_position', 'color', 'size', 'width', 'shape'];
    let configObject: Partial<DynamicButton> = {};
    switch (args.length) {
      case 1: {
        switch (typeof args[0]) {
          case 'object': {
            if (Array.isArray(args[0])) {
              const argArr = <Array<any>>args[0];
              // configObject.dynamic_btn_name = argo[0];
              configObject = transformArrayToObject(argArr, nameArr);
              configObject.dynamic_btn_eventType = argArr[0];
            } else {
              //  if its just on object then go ahead
              configObject = <DynamicButton>args[0];
            }
            break;
          }
          case 'string': {
            configObject.dynamic_btn_name = <string>args[0];
            configObject.dynamic_btn_eventType = <string>args[0];
            break;
          }
          default: {
            throw new Error('this class expects an argument of array or object or string if only one value is provided');
          }
        }
        break;
      }
      case 2: {
        // and to handle for the 3rd which is the event type and assumed to be name if not this way
        configObject = transformArrayToObject(args, nameArr);
        configObject['dynamic_btn_eventType'] = <string>args[0];
        break;
      }
      default: {
        configObject = transformArrayToObject(args, nameArr);
      }
    }

    const defaults = {
      dynamic_btn_position: Position.middle,
      dynamic_btn_disable: false,
      color: Color.default,
      size: Size.default,
      width: Width.inline,
      shape: Shape.none,
    };
    // now config object has been populated , so now to combine with defaults and run through that
    this.processObject(configObject, defaults);
  }
}

// < ------------------------------- observable disabled bellow ---------------------- >

type ObsButtonCreationArgumentsArray =
  | [string]
  | [string, Observable<boolean>]
  | [string, Observable<boolean>, string]
  | [string, Observable<boolean>, string, Position]
  | [string, Observable<boolean>, string, Position, Color]
  | [string, Observable<boolean>, string, Position, Color, Size]
  | [string, Observable<boolean>, string, Position, Color, Size, Depth]
  | [string, Observable<boolean>, string, Position, Color, Size, Depth, Width]
  | [string, Observable<boolean>, string, Position, Color, Size, Depth, Width, Shape];

export class ObsDynamicButtonClass implements DynamicButtonObs {
  public dynamic_btn_name: string;
  public dynamic_btn_eventType: string;
  public dynamic_btn_position: Position; // Position on the bottom bar
  public disabled$: Observable<boolean>;
  public color?: Color;
  public size?: Size;
  public width?: Width;
  public shape?: Shape;

  processObject(values, defaults) {
    const obj = { ...defaults, ...values };
    const { dynamic_btn_name, dynamic_btn_eventType, dynamic_btn_position, disabled$, color, size, width, shape } = obj;

    this.dynamic_btn_name = dynamic_btn_name;
    this.dynamic_btn_eventType = dynamic_btn_eventType;
    this.dynamic_btn_position = dynamic_btn_position;
    this.disabled$ = disabled$;
    this.color = color;
    this.size = size;
    this.width = width;
    this.shape = shape;
  }
  //  i want to be able to pass an object, or an array of arguments
  constructor(config: Partial<DynamicButtonObs> | ObsButtonCreationArgumentsArray);
  constructor(name: string, disabled$: Observable<boolean>);
  constructor(...args: ObsButtonCreationArgumentsArray);
  constructor(...args) {
    const nameArr = ['dynamic_btn_name', 'disabled$', 'dynamic_btn_eventType', 'dynamic_btn_position', 'color', 'size', 'width', 'shape'];
    let configObject: Partial<DynamicButton> = {};
    switch (args.length) {
      case 1: {
        switch (typeof args[0]) {
          case 'object': {
            if (Array.isArray(args[0])) {
              const argArr = <Array<any>>args[0];
              // configObject.dynamic_btn_name = argo[0];
              configObject = transformArrayToObject(argArr, nameArr);
              configObject.dynamic_btn_eventType = argArr[0];
            } else {
              //  if its just on object then go ahead
              configObject = <DynamicButton>args[0];
            }
            break;
          }
          case 'string': {
            configObject.dynamic_btn_name = <string>args[0];
            configObject.dynamic_btn_eventType = <string>args[0];
            break;
          }
          default: {
            throw new Error('this class expects an argument of array or object or string if only one value is provided');
          }
        }
        break;
      }
      case 2: {
        // and to handle for the 3rd which is the event type and assumed to be name if not this way
        configObject = transformArrayToObject(args, nameArr);
        configObject['dynamic_btn_eventType'] = <string>args[0];
        break;
      }
      default: {
        configObject = transformArrayToObject(args, nameArr);
      }
    }
    const defaults = {
      dynamic_btn_position: Position.middle,
      disabled$: new BehaviorSubject(false),
      color: Color.default,
      size: Size.default,
      width: Width.inline,
      shape: Shape.none,
    };

    // now config object has been populated , so now to combine with defaults and run through that
    this.processObject(configObject, defaults);
  }
}
