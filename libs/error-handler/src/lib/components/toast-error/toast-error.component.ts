import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { getErrors } from '../../store/error-handler.selectors';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'flx-toast-error',
  templateUrl: './toast-error.component.html',
})
export class ToastErrorComponent implements OnInit, OnDestroy {
  @Input() errorMessage!: any;
  errors!: any;
  errorsSub!: Subscription;
  errorKeys: any[] = [];

  @Output() cancel = new EventEmitter<string>();
  @Output() retry = new EventEmitter<any>();
  constructor(private store: Store<any>, private toastr: ToastrService) {}

  ngOnInit() {
    this.errorsSub = this.store.select(getErrors).subscribe((errors) => {
      this.errors = errors;
      this.errorKeys = Object.keys(errors);
      setTimeout(() => {
        this.toastr.error(this.errors[this.errorKeys[0]].errorMessage);
      });
    });
  }

  onCancel(key: string) {
    this.cancel.emit(key);
    // this.store.dispatch(new RemoveError({ dataKey: key }));
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
