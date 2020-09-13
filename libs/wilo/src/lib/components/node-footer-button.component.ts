import { Component, OnInit, Input } from '@angular/core';
import { CoreServices } from '../services/core.services';
import { Subscription, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FooterButtonConfig } from '../models';


@Component({
    selector: 'node-footer-button',
    template: `
        <button
        class="button"
        [ngClass]="arrClasses"
        [ngStyle]="{
            'max-width.px': maxWidth
        }"
        *ngIf="isVisible | async"
        [disabled]="isDisabled | async"
        (click)="onClick($event)">{{nav?.text}}</button>
    `,
    styleUrls: ['node-footer-button.component.scss']
})
export class NodeFooterButtonComponent implements OnInit {
  private _color = '';
  private _size = '';
  private _display = '';
  private _maxWidth;
  styleClasses = {
    colorClass: 'button--colour-default',
    sizeClass: 'button--size-default',
    roundedClass: 'button--shape-rounded',
    depthClass: '',
    displayClass: '',
    visibleClass: '',
    shapeClass: ''
  };

  public arrClasses: string[];
    @Input() nav: FooterButtonConfig;
    @Input() compInstances; // Array of instances in order
    constructor(private svc: CoreServices, private route: ActivatedRoute) {}

    ngOnInit() {
        this.arrClasses = Object.values(this.styleClasses);
    }

    onClick(ev: MouseEvent) {
        if (this.nav.onClick) {
            this.nav.onClick(this.svc, this.compInstances, this.route, ev);
        }
        if (this.nav.routerLink) {
            this.svc.router.navigate(this.nav.routerLink, { relativeTo: this.route, });
        }
    }

    get isVisible(): Observable<boolean> {
        return this.nav.visible ? this.nav.visible(this.svc, this.route) : of(true);
    }

    get isDisabled(): Observable<boolean> {
        return this.nav.disable ? this.nav.visible(this.svc) : of(false);
    }

     // Button Color
    @Input()
    set color(color: string) {
        switch (color) {
        case 'default':
            this.styleClasses.colorClass = 'button--colour-default';
            break;
        case 'primary':
            this.styleClasses.colorClass = 'button--colour-primary';
            break;
        case 'secondary':
            this.styleClasses.colorClass = 'button--colour-secondary';
            break;
        case 'success':
            this.styleClasses.colorClass = 'button--colour-success';
            break;
        case 'alert':
            this.styleClasses.colorClass = 'button--colour-alert';
            break;
        case 'warn':
            this.styleClasses.colorClass = 'button--colour-warn';
            break;
        case 'danger':
            this.styleClasses.colorClass = 'button--colour-danger';
            break;
        case 'toggle':
            this.styleClasses.colorClass = 'button--colour-toggle';
            break;
        default:
            this.styleClasses.colorClass = 'button--colour-default';
        }
        this._color = color;
    }
    get color() {
        return this._color;
    }

    // Button Size
  @Input()
  set size(size: string) {
    switch (size) {
      case 'default':
        this.styleClasses.sizeClass = 'button--size-default';
        break;
      case 'small':
        this.styleClasses.sizeClass = 'button--size-small';
        break;
      case 'medium':
        this.styleClasses.sizeClass = 'button--size-medium';
        break;
      case 'large':
        this.styleClasses.sizeClass = 'button--size-large';
        break;
      default:
        this.styleClasses.sizeClass = 'button--size-default';
    }
  }
  get size() {
    return this._size;
  }

  // Button Width
  @Input()
  set display(display: string) {
    switch (display) {
      case 'block':
        this.styleClasses.displayClass = 'button--display-block';
        this.maxWidth = -1;
        break;
      case 'inline':
        this.styleClasses.displayClass = 'button--display-inline';
        this.maxWidth = -1;
        break;
      default:
        this.styleClasses.displayClass = 'button--display-inline';
    }
  }
  get width() {
    return this._display;
  }

  @Input()
  set maxWidth(maxWidth: number) {
    this._maxWidth = maxWidth;
  }
  get maxWidth() {
    return this._maxWidth;
  }


}
