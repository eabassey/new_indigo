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
  selector: 'claim-card',
  templateUrl: './claim-card.component.html',
  styleUrls: ['./claim-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimCardComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() claim: any;
  @Input() statesMap: {[id: number]: any};
  @Input() skillsMap: {[id: number]: any};
  @Input() appointmentsMap: {[id: number]: any};
  @Input() instructionsMap: {[id: number]: any};
  @Input() spsMap: {[id: number]: any};
  slaTimeColor = 'grey';
  sla: {text: string; color: string};

  subs: any[] = [];

  // fse = Four Sure Event
  engState: string;
  engClaimType: string;

  // This preload class is used to guard against the hiding animation on load.
  preload = true;
  isOffline = false;
  isOnline = true;
  indicatorClass = '';


  constructor(private svc: CoreServices) {}

  ngOnInit() {
    if (this.statesMap) {
      this.sla = get_sla_time(this.claim, this.statesMap);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['statesMap']?.currentValue) {
      this.sla = get_sla_time(this.claim, this.statesMap);
    }
  }

  ngAfterViewInit() {}

  selectItem(claim) {
    // this.select.emit(claim);
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

  takeAction(claim): void {
    const text = (this.statesMap[claim.state] as string).toLowerCase().split(' ').join('-');
    this.svc.router.navigate([`../${text}`, {claimId: claim.id}])
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
