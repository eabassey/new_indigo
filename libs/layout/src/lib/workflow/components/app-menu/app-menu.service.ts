import { Injectable, Injector, ComponentRef, HostListener } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { FLXAppMenuComponent } from './app-menu.component';

import { AppMenuOverlayRef } from './app-menu-overlay-ref';
import { filter } from 'rxjs/operators';
import { merge } from 'rxjs';
import { ESCAPE } from '@angular/cdk/keycodes';
import { ofType, Actions } from '@ngrx/effects';

interface AppMenuConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: AppMenuConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'side-panel'
};

@Injectable()
export class AppMenuOverlayService {
  appMenuRef!: AppMenuOverlayRef;
  constructor(private injector: Injector, private overlay: Overlay, private actions$: Actions) {}

  open(config: AppMenuConfig = {}) {
    // Override default config
    const appMenuConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(appMenuConfig);

    // Instantiate remote control
    this.appMenuRef = new AppMenuOverlayRef(overlayRef);

    const overlayComponent = this.attachAppMenuContainer(overlayRef, appMenuConfig, this.appMenuRef);

    this.appMenuRef.componentInstance = overlayComponent;

    merge(
      overlayRef.backdropClick(),
      overlayRef.detachments(),
      overlayRef.keydownEvents().pipe(filter(event => event.keyCode === ESCAPE)),
      this.actions$.pipe(ofType('LOGOUT_SUCCESS'))
    ).subscribe(() => {
      this.appMenuRef.close();
    });

    return this.appMenuRef;
  }

  private createOverlay(config: AppMenuConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private attachAppMenuContainer(overlayRef: OverlayRef, config: AppMenuConfig, appMenuRef: AppMenuOverlayRef) {
    const injector = this.createInjector(config, appMenuRef);

    const containerPortal = new ComponentPortal(FLXAppMenuComponent, null, injector);
    const containerRef: ComponentRef<FLXAppMenuComponent> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(config: AppMenuConfig, appMenuRef: AppMenuOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(AppMenuOverlayRef, appMenuRef);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(config: AppMenuConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .left()
      .top();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
