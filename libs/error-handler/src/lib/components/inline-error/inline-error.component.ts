import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { getErrors } from '../../store/error-handler.selectors';
import { Subscription } from 'rxjs';
import { RemoveError } from '../../store/error-handler.actions';

@Component({
  selector: 'flx-inline-error',
  templateUrl: './inline-error.component.html',
  styleUrls: ['./inline-error.component.scss']
})
export class InlineErrorComponent implements OnInit, OnDestroy {
  @Input() errorMessage!: string;
  @Input() node!: any;
  errors!: any;
  errorsSub!: Subscription;
  errorKeys: any[] = [];

  @Output() cancel = new EventEmitter<string>();
  @Output() retry = new EventEmitter<any>();
  @Output() autoRetry = new EventEmitter<any>();
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.errorsSub = this.store.select(getErrors).subscribe(errors => {
      this.errors = errors;
      if (errors && errors.response && errors.response.errorMessage === 'This claim could not be created!') {
        this.errorKeys = [];
      } else {
        this.errorKeys = Object.keys(errors);
      }

      // On auto retry, do it one at a time
      const retryCall = errors[this.errorKeys[0]] && errors[this.errorKeys[0]].retryCall;
      if (retryCall) {
        this.onAutoRetryCall(this.node, retryCall);
      }
    });
  }

  onAutoRetryCall(node: any, retryCall: any) {
    if (node && node.errorHandler && node.errorHandler.retryPolicy === 'auto') {
      //
      this.autoRetry.emit({ retryInterval: 3000, retryCount: 3 });
    } else if (this.node && this.node.erroHandler && typeof this.node.errorHandler.retryPolicy === 'object') {
      //
      const { retryInterval, retryCount } = this.node.errorHandler.retryPolicy;
      this.autoRetry.emit({ retryInterval, retryCount });
    }
  }

  onCancel(key: string) {
    // this.cancel.emit(key);
    this.store.dispatch(new RemoveError({ dataKey: key }));
  }

  onRetry(retryCall: any) {
    this.retry.emit(retryCall);
    // this.store.dispatch(new RemoveError({ dataKey: retryCall.dataKey }));
    // this.store.dispatch(new MakeServerCall({ ...retryCall }));
  }

  ngOnDestroy() {
    if (this.errorsSub) this.errorsSub.unsubscribe();
  }
}
