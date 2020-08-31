import { Directive, ViewContainerRef, ElementRef, Input, HostListener } from '@angular/core';
import { OverlayRef, Overlay, OverlayConfig, ConnectionPositionPair } from '@angular/cdk/overlay';
import { FLXDateTimeConfigurablePickerComponent } from '../date-time-configurable-picker.component';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[date-time-type-picker-trigger]',
  // host: {
  //   '(click)': 'click($event)',
  // },
})
export class DateTimeTypePickerTriggerDirective {
  private _overlayRef: OverlayRef;

  @Input('date-time-type-picker-trigger') dateTimeTypePicker: FLXDateTimeConfigurablePickerComponent;

  constructor(public overlay: Overlay, private elementRef: ElementRef, private viewContainerRef: ViewContainerRef) {}

  private init() {
    const positions = [
      new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
      new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
    ];
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);

    // const positionStrategy = this.overlay
    //   .position()
    //   .connectedTo(this.elementRef, { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' });

    const overlayConfig = new OverlayConfig({
      maxWidth: 550,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy,
    });

    this._overlayRef = this.overlay.create(overlayConfig);

    this._overlayRef.backdropClick().subscribe(() => this._overlayRef.detach());
  }
  @HostListener('click')
  click() {
    if (!this._overlayRef) {
      this.init();
    }
    this._overlayRef.detach();
    const picker = new TemplatePortal(this.dateTimeTypePicker.template, this.viewContainerRef);
    this._overlayRef.attach(picker);
  }
}
