import {
  Component,
  forwardRef,
  OnInit,
  OnDestroy,
  Input,
  ElementRef,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { returnOrDefault, cleanUpSub } from '@indigo/utilities';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CdkPortal } from '@angular/cdk/portal';
import { OverlayRef, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';

export interface ModalNavButton {
  text: string;
  color?: 'alert' | 'primary' | 'default';
  linkType?: 'close' | 'nextNode' | 'submitThenNext';
  nextNode?: string;
  serverCalls?: object;
  clickHandler?: (ev: Event) => void;
}

@Component({
  selector: 'flx-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FLXModalComponent),
      multi: true
    }
  ]
})
export class FLXModalComponent implements OnInit, OnDestroy {
  private _color = '';
  _type: string;
  _close = false;
  _submit = true;

  styleClasses = {
    colorClass: 'modal--colour-warning'
  };

  get arrClasses() {
    return Object.values(this.styleClasses);
  }

  overlayRef: OverlayRef;
  backdropSub: Subscription;
  @ViewChild('overlayTemplate', { static: false }) overlayTemplate: CdkPortal;
  @ViewChild('modalHeader', { static: false }) modalHeader: ElementRef;
  @ViewChild('modalContent', { static: false }) modalContent: ElementRef;

  @Input() backgroundClose = false; // if true, you can click the background to close
  @Input() message = '';
  @Input() heading: string = null;
  @Input() subheading: string = null;
  @Input() navButtons: ModalNavButton[] = null;
  @Input() displayHeading = true;

  @Input() set type(t: string) {
    this._type = t;
    switch (t) {
      case 'warning':
        this.heading = !!this.heading ? this.heading : 'Warning';
        this.color = 'alert';
        this.styleClasses.colorClass = 'modal--colour-warning';
        break;
      case 'info':
        this.heading = !!this.heading ? this.heading : 'Information';
        this.styleClasses.colorClass = 'modal--colour-infomation';
        this.color = 'primary';
        break;
      case 'success':
        this.heading = !!this.heading ? this.heading : 'Success';
        this.styleClasses.colorClass = 'modal--colour-infomation';
        this.color = 'primary';
        break;
      case 'danger':
        this.heading = !!this.heading ? this.heading : 'Danger';
        this.styleClasses.colorClass = 'modal--colour-danger';
        this.color = 'danger';
        break;
      default:
        this._type = 'default';
        this.styleClasses.colorClass = 'modal--colour-warning';
        this.heading = !!this.heading ? this.heading : 'alert';
        break;
    }
  }
  get type() {
    return returnOrDefault(this._type, 'default');
  }

  @Input() set color(c: string) {
    this._color = c;
    switch (c) {
      case 'alert':
        this.styleClasses.colorClass = 'modal--colour-warning';
        break;
      case 'primary':
        this.styleClasses.colorClass = 'modal--colour-infomation';
        break;
      case 'danger':
        this.styleClasses.colorClass = 'modal--colour-danger';
        break;
      default:
        this.styleClasses.colorClass = 'modal--colour-warning';
        break;
    }
  }
  get color() {
    return returnOrDefault(this._color, 'default');
  }

  @Input() set closeButton(t: any) {
    this._close = t === 'true' ? true : false;
  }
  get closeButton() {
    return returnOrDefault(this._close, false);
  }
  @Input() set submitButton(t: any) {
    this._submit = t === 'true' ? true : false;
  }
  get submitButton() {
    return returnOrDefault(this._submit);
  }

  // ======================================== General Methods ========================================
  constructor(
    private el: ElementRef,
    private _store: Store<any>,
    public router: Router,
    // private controller: ManifestController<any>,
    private overlay: Overlay,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.close();
    cleanUpSub(this.backdropSub);
  }

  open(): void {
    if (this.overlayRef) {
      // keep only one modal open at a time
      this.overlayRef.dispose();
    }
    this.openTemplateOverlay();
  }

  close(): void {
    if (!!this.overlayRef) {
      this.overlayRef.dispose();
    }
    this.clearData();
  }

  // ======================================== CDK Methods ========================================
  openTemplateOverlay() {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      positionStrategy
    });

    overlayConfig.hasBackdrop = true;

    this.overlayRef = this.overlay.create(overlayConfig);

    if (this.backgroundClose || (!this.closeButton && !this.navButtons)) {
      this.clickBackdrop();
    }

    this.overlayRef.attach(this.overlayTemplate);
  }

  clickBackdrop() {
    this.backdropSub = this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.dispose();
    });
  }

  // ========================================== CONTENT Methods ==========================================
  setMessage(content: any[]) {
    setTimeout(() => {
      if (!!this.modalContent) {
        this.modalContent.nativeElement.innerHTML = '';
        content.forEach(element => {
          this.modalContent.nativeElement.innerHTML += element + '<br />';
        });
      }
      this.cd.detectChanges();
    }, 0);
  }

  setHeading(heading: string) {
    this.subheading = heading;
  }

  takeButtonAction(button) {
    // append Click handler from navs manifest
    if (button.clickHandler) {
      button.clickHandler(button);
    }

    switch (button.linkType) {
      case 'close':
        this.close();
        break;
      case 'nextNode':
        if (button.nextNode !== null) {
          // this.controller.dispatch(new SetNextNode(button.nextNode));
        } else {
          // this.controller.dispatch(new SetPreviousNode());
        }
        this.close();
        break;
      case 'submitThenNext':
        if (button.serverCalls) {
          Object.entries(button.serverCalls).forEach(([dataKey, call]: any) => {
            // this._store.dispatch(new MakeServerCall({ dataKey, ...call, nextNode: button.nextNode }));
          });
          this.close();
        }
        break;
    }
  }

  clearData() {
    // this.navButtons = null;
    this.heading = null;
    if (!!this.modalContent) {
      this.modalContent.nativeElement.innerHTML = '';
      this.message = '';
      this.subheading = null;
    }
  }
}
