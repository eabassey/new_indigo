import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { take, map, tap, filter } from 'rxjs/operators';

import { Observable, Subscription, of } from 'rxjs';
import { Store } from '@ngrx/store';
// import { getAppMenuOpened, CloseAppMenu, OpenAppMenu } from '@flexus/ux';
// import { BigFormService, NetworkService, getSettings, ManifestController, getActiveManifestItem } from '@flexus/engine';
import { AppMenuOverlayService } from '../app-menu/app-menu.service';
import { AppMenuOverlayRef } from '../app-menu/app-menu-overlay-ref';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'flx-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['app-bar.component.scss']
})
export class FLXAppBarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() manifestItem;
  openAppMenu$: Observable<boolean>;
  title$: Observable<string>;
  networkCheckSubscription: Subscription;
  settings: any;
  disableMenu: boolean;

  // TODO: Offline checking needs to be added
  isOffline = false;

  constructor(
    private _store: Store<any>,
    // private bf: BigFormService,
    // private networkService: NetworkService,
    // public controller: ManifestController<any>,
    // private appMenu: AppMenuOverlayService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.getCurrentRoute();
    // this.getSettings();
    // this.setTitle();
    // this.getAppMenuState();
    // this.notifyNetworkStatus();
  }

  getCurrentRoute() {
    // this.activeManifestSubscription = this.controller
    //   .select(getActiveManifestItem)
    //   .pipe(filter(manifestItem => manifestItem && manifestItem.id !== this._lastInitialisedManifestItemId))
    //   .subscribe(manifestItem => {
    //     this._lastInitialisedManifestItemId = manifestItem.id;
    //     this.disableMenu = manifestItem.id !== 'Workflow';
    //   });
  }

  private getSettings() {
    // this.controller
    //   .select(getSettings)
    //   .pipe(take(1))
    //   .subscribe(settings => (this.settings = settings));
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['manifestItem']) {
    //   this.setTitle();
    // }
  }

  setTitle() {
    // const title = this.manifestItem && this.manifestItem.header && this.manifestItem.header.title;
    // if (title && typeof title === 'string') {
    //   this.title$ = of(title);
    // } else if (typeof title === 'function') {
    //   this.title$ = title(this._store, this.bf);
    // }
  }

  getAppMenuState() {
    // this.openAppMenu$ = this._store.select(getAppMenuOpened);
  }

  toggleMenu() {
    // let appMenuRef: AppMenuOverlayRef = this.appMenu.open();
    // this.openAppMenu$.pipe(take(1)).subscribe(opened => {
    //   if (opened) {
    //   } else {
    //   }
    // });
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
