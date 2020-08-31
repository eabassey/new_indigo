# Drag and Drop

## Introduction

There are two ways in which the drag and drop functionality may be used, the first is simple usage with the second being implementing the
functionality within your own components.

## Usage

The first thing to understand is that these components relay on a reactive form control being setup, present and bound to these components in order to
work properly, it is also possible to use ngModel. Just be aware that these components internally call `onChange()` and `onTouch()` and will error out
if those functions are not currently present.

so to use you setup the component in your template like so

```html
<ul>
  <li erDraggable appendValue="value1"> value1 </li>
  <li erDraggable appendValue="value2"> value2 </li>
  <li erDraggable appendValue="value3"> value3 </li>
  <li erDraggable appendValue="value4"> value4 </li>
  <li erDraggable appendValue="value5"> value5 </li>
  <li erDraggable appendValue="value6"> value6 </li>
</ul>

<form>
    <flx-input-text drop="t" formControlName="city" [noEndingSpace]="true" type="text"></flx-input-text>
  </div>
</form>
```

note the `erDraggable` , which is a directive allowing you to drag an element, the attribute appendValue allows you to specify the data that will be
converted to a dom string and sent to the input and the `drop="t"` which allows this particular input to receive data from the drop event.

## Development

This is a little more complex but not overly so.

### summary

simply put you extend the DroppableFormControl abstract class on the component. Once that is done it should work just fine. The class also wraps
Control Value Accessor so that will need to be implementd as well

I am including the class bellow, as at 14:40 21/11/2018

```typescript
import { ControlValueAccessor, FormControlName } from '@angular/forms';
import { HostListener, Input, HostBinding } from '@angular/core';
import { returnOrDefault } from '@indigo/utilities';

export abstract class DroppableFormControl implements ControlValueAccessor {
  @Input()
  set drop(v: any) {
    this._dropReceiver = /(true|t)/gi.test(`${v}`);
  }

  private _dropReceiver;

  /**
   * @override this , this method will be called on a drop event, by implementing this class
   * @param dragData this will automatically be filled with the data appended by the draggable directive
   */
  abstract processDrop(dragData: string): void;
  abstract writeValue(obj: any): void;
  abstract registerOnChange(fn: any): void;
  abstract registerOnTouched(fn: any): void;
  abstract setDisabledState?(isDisabled: boolean): void;

  @HostListener('drop', ['$event'])
  handleDrop(e: DragEvent) {
    // the bellow is so that you can not drop data into the component without letting it be droppable
    e.preventDefault();
    if (this._dropReceiver === true) {
      const dragData = e.dataTransfer.getData('erDragDrop');
      this.processDrop(dragData);
    }
  }

  @HostListener('dragover', ['$event'])
  preventDefault(e: DragEvent) {
    // console.log(this._dropReceiver);
    if (this._dropReceiver === true) {
      e.preventDefault();
    }
  }
}
```

### explanation

The `drop` input and `dropReciver` private variable are used to allow data to be dropped on this component, if its not included or set as true then
the component will not respond to a drop event.

This class automatically takes care of the dragover and drop events, blocking the default and in the case of a drop, extracting data that has been
appended to the `dataTransfer` property of the event by the companion directive. it will then call the `processDrop()` method that the control will
need to have implemented with the data that has been included.

in the case of the `er-text-input` this has been done as follows

```typescript
 processDrop(dragData: string) {
    this.writeValue(dragData);
    this._input.focus();
    this.handleChanges();
  }
```
