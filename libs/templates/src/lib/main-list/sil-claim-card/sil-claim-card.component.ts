import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  Renderer2,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'flx-sil-claim-card',
  templateUrl: './sil-claim-card.component.html',
  styleUrls: ['./sil-claim-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SilClaimCardComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() itemOne: any;

  subs: any[] = [];

  // fse = Four Sure Event
  engState: string;
  engClaimType: string;

  // This preload class is used to guard against the hiding animation on load.
  preload = true;
  isOffline = '';
  indicatorClass = '';

  constructor(
    private _store: Store<any>,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
  }

  ngAfterViewInit() {}

  selectItem(itemOne) {
    // this.select.emit(itemOne);
  }

  expandContent(): void {
    // this.preload = false;
    // this.expanded = !this.expanded;

    // if (this.expanded) {
    //   this.fseExpansion.emit();
    // }
  }

  openSendMessage(jobId: number): void {
    // this.fseSendJobMessage.emit(jobId);
  }

  takeClaimAction(): void {
 
  }

  checkPermission(menuItem: any) {

  }

  checkArrays(arr1: Array<any>, arr2: Array<any>) {
    let res = false;
    arr1.forEach(val => {
      if (arr2.includes(val)) {
        res = true;
      }
    });
    return res;
  }

  deleteLocalDraft(key: string) {
    
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      if (sub) sub.unsubscribe();
    });
  }
}
