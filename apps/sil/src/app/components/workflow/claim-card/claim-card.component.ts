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
import { getText, get_indicator_color, get_sla_time } from '../item-utils';
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
  @Input() user;
  indicatorColor = 'grey';
  sla: {text: string; color: string};
  stateDescription;
  instruction;

  subs: any[] = [];

  // fse = Four Sure Event
  engClaimType: string;

  // This preload class is used to guard against the hiding animation on load.
  preload = true;
  isOffline = false;
  isOnline = true;


  constructor(private svc: CoreServices) {}

  ngOnInit() {
    if (this.statesMap) {
      this.sla = get_sla_time(this.claim, this.statesMap);
    }
    this.indicatorColor = get_indicator_color(this.claim, this.user.user.edit_states);
    if(this.statesMap) this.stateDescription = this.claim.state === 169 ? 'Local Draft' : this.statesMap[this.claim.state]?.description;


  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['statesMap']?.currentValue) {
      this.sla = get_sla_time(this.claim, this.statesMap);
    }
    if(changes['claim']?.currentValue || changes['user']?.currentValue) {
      this.indicatorColor = get_indicator_color(this.claim, this.user.user.edit_states);
    }
    this.instruction = getText(true, 1, {editRoles: {1: 'Allow something'}});
    if(changes['statesMap']?.currentValue) this.stateDescription = this.statesMap[this.claim.state]?.description;
    // this.engClaimType = this.claimTypeDescriptions ? this.claimTypeDescriptions[this.itemOne.claim_type_id] : '';
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
