import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RemoveError } from './store/error-handler.actions';
import { getActiveNode, MakeServerCall, ManifestController, getLoginError } from '@flexus/engine';
import { FLXModalComponent } from '@flexus/ui-elements';

@Component({
  selector: 'flx-error-handler',
  templateUrl: './error-handler.component.html',
  animations: [
    trigger('slide', [
      transition(':enter', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('500ms', style({ opacity: 0 }))])
    ])
  ]
})
export class ErrorHandlerComponent implements OnInit, OnDestroy {
  node;
  nodeSub: Subscription;
  loginPageError$;
  @ViewChild(FLXModalComponent, { static: true }) warningModal: FLXModalComponent;

  constructor(private store: Store<any>, private controller: ManifestController<any>) {}

  ngOnInit() {
    this.loginPageError$ = this.store.select(getLoginError);
    this.nodeSub = this.controller.select(getActiveNode).subscribe(node => {
      this.node = node;
      // if (this.node && this.node.errorHandler && this.node.erroHandler.displayFormat && this.node.erroHandler.displayFormat === 'dialog') {
      //   this.warningModal.open();
      // }
    });
  }

  cancel(key: string) {
    if (key) {
      this.store.dispatch(new RemoveError({ dataKey: key }));
    }
  }

  autoRetry(retryCall) {
    // retry action...
  }

  retry(retryCall) {
    this.store.dispatch(new RemoveError({ dataKey: retryCall.dataKey }));
    this.store.dispatch(new MakeServerCall({ ...retryCall }));
  }

  ngOnDestroy() {
    if (this.nodeSub) this.nodeSub.unsubscribe();
  }
}
