import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { take, map, tap, filter } from 'rxjs/operators';

import { Observable, Subscription, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppMenuOverlayService } from '../app-menu/app-menu.service';
import { AppMenuOverlayRef } from '../app-menu/app-menu-overlay-ref';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { AppConfig, CoreServices, StateConfig } from '@wilo';

@Component({
  selector: 'flx-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['app-bar.component.scss']
})
export class FLXAppBarComponent implements OnInit, OnChanges, OnDestroy {
  state: StateConfig;
  openAppMenu = false;
  title$: Observable<string>;
  networkCheckSubscription: Subscription;
  settings: any;
  state$: Observable<StateConfig>;
  hamburgerIcon = 'app-menu-hamburger';

  // TODO: Offline checking needs to be added
  isOffline = false;

  constructor(
    private _store: Store<any>,
    // private bf: BigFormService,
    // private networkService: NetworkService,
    // public controller: ManifestController<any>,
    private appMenu: AppMenuOverlayService,
    public route: ActivatedRoute,
    private svc: CoreServices
  ) {}

  ngOnInit() {
    this.setState();
    // this.getCurrentRoute();
    // this.getSettings();
    // this.setTitle();
    // this.notifyNetworkStatus();
  }


  ngOnChanges(changes: SimpleChanges) {
  }

  setState() {
    this.state$ = this.svc.configAccessor.currentState$;
  }

  toggleMenu() {
    let appMenuRef: AppMenuOverlayRef = this.appMenu.open();
    this.svc.keyValueStore.setItem('appMenuRef', appMenuRef);
    if (this.openAppMenu) {
      this.openAppMenu = false;
    } else {
      this.openAppMenu = true;
    }
  }

  private notifyNetworkStatus() {
    // this.networkCheckSubscription = this.networkService.isOnline.subscribe(isOnline => {
    //   if (isOnline) {
    //     this.isOffline = false;
    //     // this._toastr.success('You are online', 'Network Connection', { timeOut: 2000 });
    //   } else {
    //     this.isOffline = true;
    //   }
    // });
  }

  ngOnDestroy() {
    if (this.networkCheckSubscription) {
      this.networkCheckSubscription.unsubscribe();
    }
  }
}
