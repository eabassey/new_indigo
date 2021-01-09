import { HostListener, Input, Component } from '@angular/core';

@Component({selector: 'droppable', template: ''})
export abstract class DroppableFormControl {
  @Input('droppable')
  set droppable(v: any) {
    // console.log(v);
    this._dropReceiver = /(true|t)/gi.test(`${v}`) || v === null || v === undefined || v === '' ? true : false;
  }

  private _dropReceiver!: any;

  /**
   * @override this , this method will eb called on a drop event, by implementing this class
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
      // console.log(e);
      // console.log(e.dataTransfer.getData('erDragDrop'));
      const dragData = e?.dataTransfer?.getData('erDragDrop');
      this.processDrop(dragData as string);
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
