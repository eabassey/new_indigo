import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getErrors } from '../../store';

@Component({
  selector: 'flx-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class FLXErrorModalComponent implements OnInit, OnDestroy {
  @Input() errorMessage;
  @Input() node;
  // @Input() id: string;
  // @Input() NgModel: NgModel;
  // @Input() heading: string = '';
  // element: any;
  // _type: string;
  errors;
  errorsSub: Subscription;
  errorKeys = [];

  // @Input() set type(t: string) {
  //   this._type = t;
  //   // console.log({ type: t });
  //   switch (t) {
  //     case 'warning':
  //       this.heading = 'Warning';
  //       break;
  //     case 'info':
  //       this.heading = 'Information';
  //       break;
  //     default:
  //       this._type = 'default';
  //   }
  // }
  // get type() {
  //   return returnOrDefault(this._type, 'Warning');
  // }

  @Output() cancel = new EventEmitter<string>();
  @Output() retry = new EventEmitter<any>();
  @Output() autoRetry = new EventEmitter<any>();

  constructor(
    private store: Store<any> // private modalService: ModalsService, // private el: ElementRef
  ) {
    // this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // const modal = this;

    // ensure id attribute exists
    // if (!this.id) {
    //   console.log('modal must have an id');
    //   return;
    // }

    // move element to bottom of page (just before </body> so it can be displayed before anything else)
    // document.body.appendChild(this.element);

    // close modal on background click
    // this.element.addEventListener('click', function(e: any) {
    //   if (e.target.className === 'er-modal') {
    //     modal.close();
    //   }
    // });

    // add self (this modal instance) to the modal service so it is accessible  from controllers
    // this.modalService.add(this);

    this.errorsSub = this.store.select(getErrors).subscribe(errors => {
      this.errors = errors;
      this.errorKeys = Object.keys(errors);
      // if (this.node.errorHandler && this.node.erroHandler.displayFormat && this.node.erroHandler.displayFormat === 'dialog') {
      //   this.open();
      // }

      // On auto retry, do it one at a time
      const retryCall = errors[this.errorKeys[0]] && errors[this.errorKeys[0]].retryCall;
      if (retryCall) {
        this.onAutoRetryCall(this.node, retryCall);
      }
    });
  }

  onAutoRetryCall(node, retryCall) {
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
    this.cancel.emit(key);
    // this.store.dispatch(new RemoveError({ dataKey: key }));
  }

  onRetry(retryCall) {
    this.retry.emit(retryCall);
    // this.store.dispatch(new RemoveError({ dataKey: retryCall.dataKey }));
    // this.store.dispatch(new MakeServerCall({ ...retryCall }));
  }

  ngOnDestroy() {
    if (this.errorsSub) this.errorsSub.unsubscribe();
    // this.modalService.remove(this.id);
    // this.element.remove();
  }

  // close modal
  // close(): void {
  //   this.element.style.display = 'none';
  //   document.body.classList.remove('er-modal-open');
  // }

  // open modal
  // open(): void {
  //   this.element.style.display = 'block';
  //   document.body.classList.add('er-modal-open');
  // }

  setMessage(content: any[]) {
    const doc = document.getElementById('modal-content-output');
    doc.innerHTML = '';
    content.forEach(element => {
      doc.innerHTML += element + '<br />';
    });
  }
}
