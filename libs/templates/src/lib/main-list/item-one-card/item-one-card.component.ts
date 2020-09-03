import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { get_sla_time } from '../item-utils';
import { CoreServices } from '@wilo';


@Component({
  selector: 'item-one-card',
  templateUrl: './item-one-card.component.html',
  styleUrls: ['./item-one-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemOneCardComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() itemOne: any;
  @Input() statesMap: {[id: number]: any};
  @Input() skillsMap: {[id: number]: any};
  @Input() appointmentsMap: {[id: number]: any};
  @Input() spsMap: {[id: number]: any};
  slaTimeColor = 'grey';
  sla: {text: string; color: string};

  subs: any[] = [];

  // fse = Four Sure Event
  engState: string;
  engClaimType: string;

  // This preload class is used to guard against the hiding animation on load.
  preload = true;
  isOffline = '';
  isOnline = false;
  indicatorClass = '';


  constructor(private svc: CoreServices) {}

  ngOnInit() {
    this.sla = get_sla_time(this.itemOne, this.statesMap);
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngAfterViewInit() {}

  selectItem(itemOne) {
    // this.select.emit(itemOne);
  }

  selectMenuItem(item, {}) {

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

  takeAction(itemOne): void {
    const text = (this.statesMap[itemOne.state] as string).toLowerCase().split(' ').join('-');
    this.svc.router.navigate([`../${text}`, {claimId: itemOne.id}])
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
