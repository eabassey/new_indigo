import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
  OnChanges,
  ChangeDetectorRef
} from '@angular/core';
import { Store } from '@ngrx/store';
import { take, skipWhile } from 'rxjs/operators';
import { Subscription, isObservable, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToolbarControlConfig, CoreServices } from '@indigo/engine';

@Component({
  selector: 'flx-header-actions',
  templateUrl: './header-actions.component.html',
  styleUrls: ['./header-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXHeaderActionsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() manifestItem;
  headerControls$: Observable<ToolbarControlConfig[]>;
  clickedControl = null;
  state = 'opened';
  isOffline = true;
  reversed = false;

  constructor(
    private svc: CoreServices,
  ) {}

  ngOnInit() {
    this.headerControls$ = this.svc.headerAcessor.headerControls;
    // this.notifyNetworkStatus();
    // if (this.manifestItem && this.manifestItem.header) {
    //   this.headerActions = this.headerActions.map(action => {
    //     if (!action.type) {
    //       action.type = 'standalone';
    //     }
    //     return action;
    //   });
    //   this.clickedAction = this.headerActions ? this.headerActions.find(action => action.isDefault) : [];
    // }
  }

  ngOnChanges() {
    // if (this.manifestItem && this.manifestItem.header) {
    //   const controlsResult = this.manifestItem.header.controls(this, this.store)();
    //   if (isObservable(controlsResult)) {
    //     controlsResult.subscribe((controls: any) => {
    //       this.headerActions = controls;
    //     });
    //   } else {
    //     this.headerActions = controlsResult;
    //   }
    //   this.headerActions = this.headerActions.map(action => {
    //     if (!action.type) {
    //       action.type = 'standalone';
    //     }
    //     return action;
    //   });
    //   this.clickedAction = this.headerActions ? this.headerActions.find(action => action.isDefault) : [];
    // }
  }

  onClick(action: ToolbarControlConfig) {
    action.command();
    this.clickedControl = action;
    // this.state = 'closed';
    // setTimeout(() => {
    //   this.state = 'opened';
    // }, 1000);
  }

  loadView(viewKey, params: { reverse: boolean }) {
    // const viewFunc = this.manifestItem.views[viewKey];
    // this.controller.dispatch(new SetView({ func: viewFunc, key: viewKey, params }));
    // console.log('Loading view....');
  }

  useExistingDataSource(viewData) {
    // this.controller.dispatch(new UseExistingDatasourceForView(viewData));
  }

  refresh() {
    // this.loadView(this.currentView, { reverse: this.reversed });
  }

  reOrder() {
    // this.loadView(this.currentView, { reverse: !this.reversed });
    // this.reversed = !this.reversed;
    // this.ngOnChanges();
  }

  loadListView() {
    this.loadView('alt', { reverse: this.reversed });
    this.ngOnChanges();
  }

  loadDetailsView() {
    this.loadView('default', { reverse: this.reversed });
    this.ngOnChanges();
  }

  newClaim() {
    // this.controller
    //   .select(getOrgKey)
    //   .pipe(take(1))
    //   .subscribe(key => {
    //     this.controller.dispatch(
    //       new SetActiveManifestItem({ pathToFlows: ['manifestItems'], orgKey: key, itemId: 'create_item_one' })
    //     );
    //   });
    // this.router.navigate(['/workflow/detail'], { skipLocationChange: true });
  }

  private notifyNetworkStatus() {
    // this.networkCheckSubscription = this.networkService.isOnline.subscribe(isOnline => {
    //   if (isOnline) {
    //     this.isOffline = false;
    //     this.cdr.detectChanges();
    //   } else {
    //     this.isOffline = true;
    //     this.cdr.detectChanges();
    //   }
    // });
  }

  ngOnDestroy() {
    // this.socketConsumer.unsubscribeToSocket();
    // if (this.networkCheckSubscription) {
    //   this.networkCheckSubscription.unsubscribe();
    // }
  }
}
