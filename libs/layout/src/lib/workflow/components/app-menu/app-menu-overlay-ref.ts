import { Injectable, ChangeDetectorRef } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { filter, take, tap } from 'rxjs/operators';

import { FLXAppMenuComponent } from './app-menu.component';
import { Observable, Subject } from 'rxjs';

export class AppMenuOverlayRef {
  private _beforeClose = new Subject<void>();
  private _afterClosed = new Subject<void>();
  componentInstance: FLXAppMenuComponent;

  constructor(private overlayRef: OverlayRef) {}

  close(): void {
    if (!!this.componentInstance) {
      this.componentInstance.animationStateChanged
        .pipe(
          tap(e => console.log({ e })),
          filter(event => event.phaseName === 'start'),
          take(1)
        )
        .subscribe(() => {
          this._beforeClose.next();
          this._beforeClose.complete();
          this.overlayRef.detachBackdrop();
        });

      this.componentInstance.animationStateChanged
        .pipe(
          filter(event => event.phaseName === 'done' && event.toState === 'leave'),
          take(1)
        )
        .subscribe(() => {
          this.overlayRef.dispose();
          this._afterClosed.next();

          this.componentInstance = null;
        });
      this.componentInstance.startExitAnimation();
    }
  }

  afterClosed(): Observable<void> {
    return this._afterClosed.asObservable();
  }

  beforeClose(): Observable<void> {
    return this._beforeClose.asObservable();
  }
}
