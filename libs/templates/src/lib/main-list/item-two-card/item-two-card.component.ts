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
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { humaniseDate } from '@indigo/utilities';
import * as moment from 'moment';
import { CoreServices } from '@wilo';


@Component({
  selector: 'item-two-card',
  templateUrl: './item-two-card.component.html',
  styleUrls: ['./item-two-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemTwoCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() itemTwo: any;
  @Input() itemOne: any;
  @Input() itemTwoContextMenuList = [];
  @Input() user: any;
  @Input() activeOrg;
  @Input() isOnline: boolean = true;
  selectedItemTwo: any;
  buttonText: string;
  appointment_text;
  appointment_text_color = '';
  @ViewChild('appointmentInfo', {read: ElementRef}) appointmentInfoHolder: ElementRef;

  @Input() skillsMap: {[id: number]: any};
  @Input() spsMap: {[id: number]: any};
  @Input() statesMap: {[id: number]: any};
  @Input() appointmentsMap: {[id: number]: any};
  @Input() instructionsMap: {[id: number]: any}
  skill: any;
  sp: any;
  stateDescription: string;
  appt: string;
  instruction: string;

  sub: Subscription[] = [];
  constructor(
    private svc: CoreServices,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.skill = this.skillsMap[this.itemTwo?.skill];
    this.sp = this.spsMap[this.itemTwo?.sp];
    this.stateDescription = this.statesMap[this.itemTwo.state]?.description;
    this.instruction = this.rd(true, 1, {editRoles: {1: 'Allow something'}});
    this.renderAppointmentInfo();
  }

  takeAction(item): void {
    console.log({route: this.route})
    // const text = (this.statesMap[item.state].description as string).toLowerCase().split(' ').join('-');
    this.router.navigate(['/testApp', item.state, {jobId: item.id}])
  }


  ngAfterViewInit() {
  }

  rd(userCanEdit: boolean, userRole: any, instructions: any) {
    const instructionText = userCanEdit
        ? (instructions && instructions.editRoles[userRole]) || (instructions && instructions.editRoles[0]) || ''
        : (instructions && instructions.viewRoles[userRole]) || (instructions && instructions.viewRoles[0]) || '';
        return instructionText;
  }

  renderAppointmentInfo() {
    // const appointmentInfoEl = this.appointmentInfoHolder.nativeElement;
      const appointment_type =
        this.itemTwo.appointment && this.itemTwo?.appointment?.appointment_type
          ? this.appointmentsMap[this.itemTwo.appointment.appointment_type]?.name
          : '';
      this.appointment_text = 'No Appointment';
      if (this.itemTwo.appointment.range_start !== null && appointment_type !== '') {
        this.appointment_text = `${humaniseDate(this.itemTwo.appointment.range_start)} ${appointment_type} ${moment(
          this.itemTwo.appointment.range_start
        ).format('HH:mm')}`;
      } else {
        this.appointment_text_color = 'var(--input-placeholder)';
        // if (appointmentInfoEl) this.renderer.setAttribute(appointmentInfoEl, 'style', 'color: var(--input-placeholder)');
      }
  }


  selectMenuItem(itemTwo, menuItem) {
    this.svc.router.navigate(['/workflow/detail'], { skipLocationChange: true });
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
  }
}
