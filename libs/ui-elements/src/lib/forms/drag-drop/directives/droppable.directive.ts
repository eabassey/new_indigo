import { ElementRef, ComponentRef, HostBinding, Host, ViewChild } from '@angular/core';
import { Directive, Renderer2, AfterViewInit } from '@angular/core';
import { DroppableFormControl } from '../models';
// DroppableFormControl
@Directive({
  selector: ' [erDroppable]',
})
/**
 * currently unfinished, ive no idea how to implement this
 */
export class FLXDroppableControlDirective implements AfterViewInit {
  // ===========================================  Variables ===========================================================
  // ---------------------------------------- Internal Variables ------------------------------------------
  // private _toBeSent: any;
  // ============================================= Inputs =============================================================
  // @Input()
  // set appendValue(value: any) {
  //   this._toBeSent = value;
  // }

  // ondragover
  // ondrop

  // @HostBinding()
  // @HostListener('ondragover', ['$event'])
  // onDragOver(e: DragEvent) {
  //   e.preventDefault();
  // }

  // @HostListener('ondrop', ['$event'])
  // onDrop(e: DragEvent) {}

  // @HostBinding('dropReceiver')
  // get dropReceiver() {
  //   return true;
  // }

  // ============================================= Outputs ============================================================
  // ============================================ Constructor =========================================================
  constructor(
    private _renderer: Renderer2,
    private _el: ElementRef, // @Host() c: DroppableFormControl
  ) {
    // this._renderer.setAttribute(this._el.nativeElement, 'dropreceiver', 'true');
    // // this._renderer.setAttribute(
    // //   this._el.nativeElement,
    // //   'ng-reflect-drop-receiver',
    // //   'true'
    // // );
    // // this._renderer.setProperty(this._el.nativeElement, 'dropReceiver', 'true');
    // c.dropReceiver = true;
    // console.log(c);
  }
  // ============================================= Methods ============================================================
  // @ViewChild(DroppableFormControl)
  // set control(c: DroppableFormControl) {
  //   console.log(c);
  //   c.dropReceiver = true;
  //   console.log(c['type']);
  // }
  // ------------------------------------------ Internal Methods ------------------------------------------
  // ----------------------------------------- Life-cycle methods -----------------------------------------
  ngAfterViewInit() {}
  // ------------------------------------------ Workflow Methods ------------------------------------------
}
