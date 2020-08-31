import { ElementRef, Input, HostListener, OnInit } from '@angular/core';
import { Directive, Renderer2 } from '@angular/core';
@Directive({
  selector: '[erDraggable]',
})
export class FLXDraggableDataDirective implements OnInit {
  // ===========================================  Variables ===========================================================
  // ---------------------------------------- Internal Variables ------------------------------------------
  private _toBeSent: any;
  // ============================================= Inputs =============================================================
  @Input()
  set appendValue(value: any) {
    this._toBeSent = value;
  }

  @Input()
  set erDraggable(value: any) {
    // console.log(value);
    this._toBeSent = value;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(e: DragEvent) {
    // console.log(this._toBeSent);
    e.dataTransfer.setData('erDragDrop', this._toBeSent);
    // console.log(e.dataTransfer.getData('erDragDrop'));
  }
  // ============================================ Constructor =========================================================
  constructor(private _renderer: Renderer2, private _el: ElementRef) {}
  // ============================================= Methods ============================================================
  // ----------------------------------------- Life-cycle methods -----------------------------------------
  ngOnInit() {
    this._renderer.setAttribute(this._el.nativeElement, 'draggable', 'true');
  }
}
