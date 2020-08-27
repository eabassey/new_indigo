import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  Renderer2,
  ElementRef,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'flx-sil-job-card',
  templateUrl: './sil-job-card.component.html',
  styleUrls: ['./sil-job-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SilJobCardComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() itemTwo: any;
  @Input() itemOne: any;
  @Input() itemTwoContextMenuList = [];
  @Input() user: any;
  @Input() itemTwoPermissions = [];
  @Input() activeOrg;
  @Input() allInfo: any;
  @Input() isOnline: boolean;
  selectedItemTwo: any;
  buttonText: string;

  stateDescription: string;
  sp: any;
  skill: any;
  appt: string;

  sub: Subscription[] = [];
  constructor(
    private _store: Store<any>,
    // private controller: ManifestController<any>,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.getValuesFromAllInfo();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getValuesFromAllInfo();
    if (changes['itemTwoPermissions']) {
      this.ngZone.runOutsideAngular(() => {
        this.sub.forEach(s => {
          if (s) s.unsubscribe();
        });
        if (this.itemTwo && this.itemOne && this.user && this.activeOrg && this.allInfo) {
          this.itemTwoPermissions.forEach(fn => {
            const res = fn(
              this.itemTwo,
              this.itemOne,
              this.user,
              this.renderer,
              this.el.nativeElement,
              this.activeOrg,
              this.allInfo,
              this
            );
            if (res) {
              this.sub.push(res);
            }
          });
        }
      });
    }
  }

  ngAfterViewInit() {}

  private getValuesFromAllInfo() {
    this.skill = this.findName(this.itemTwo.skill, this.allInfo.skills);
    this.sp =
      this.allInfo && this.allInfo.sps ? this.allInfo.sps.filter(element => element.id === this.itemTwo.sp)[0] : null;
    this.stateDescription = this.getStateDescription(this.itemTwo.state);
  }

  findName(id: number, arr: any[]) {
    if (arr !== undefined && id !== undefined) {
      const res = arr.find(obj => obj.id === id) || {};
      return res;
    } else {
      return {};
    }
  }

  getStateDescription(state: any): string {
    if (this.allInfo && this.allInfo.states) {
      return this.allInfo.states.filter(element => element.id === state)[0].description;
    } else {
      return '';
    }
  }


  selectMenuItem(itemTwo, menuItem) {
    this.router.navigate(['/workflow/detail'], { skipLocationChange: true });
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
  }
}
