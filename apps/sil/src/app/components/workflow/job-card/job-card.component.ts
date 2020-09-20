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
  selector: 'job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobCardComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() job: any;
  @Input() claim: any;
  @Input() jobContextMenuList = [];
  @Input() user: any;
  @Input() activeOrg;
  @Input() isOnline: boolean = true;
  selectedJob: any;
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
    if (this.skillsMap) this.skill = this.skillsMap[this.job?.skill];
    if (this.spsMap) this.sp = this.spsMap[this.job?.sp];
    if(this.statesMap) this.stateDescription = this.statesMap[this.job.state]?.description;
    this.instruction = this.getText(true, 1, {editRoles: {1: 'Allow something'}});
    if(this.appointmentsMap) this.renderAppointmentInfo();
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes['skillsMap']?.currentValue) this.skill = this.skillsMap[this.job?.skill];
      if (changes['spsMap']?.currentValue) this.sp = this.spsMap[this.job?.sp];
      if(changes['statesMap']?.currentValue) this.stateDescription = this.statesMap[this.job.state]?.description;
      if(changes['appointmentsMap']?.currentValue) this.renderAppointmentInfo();

  }

  takeAction(job): void {
    console.log({route: this.route})
    // const text = (this.statesMap[item.state].description as string).toLowerCase().split(' ').join('-');
    this.svc.keyValueStore.setItem('workflowURL', this.router.url);
    this.router.navigate(['/testApp', job.state, {jobId: job.id}], {queryParams: {expandActionPanel: false, actionPanel: null}})
  }


  ngAfterViewInit() {
  }

  getText(userCanEdit: boolean, userRole: any, instructions: any) {
    const instructionText = userCanEdit
        ? (instructions && instructions.editRoles[userRole]) || (instructions && instructions.editRoles[0]) || ''
        : (instructions && instructions.viewRoles[userRole]) || (instructions && instructions.viewRoles[0]) || '';
        return instructionText;
  }

  renderAppointmentInfo() {
    // const appointmentInfoEl = this.appointmentInfoHolder.nativeElement;
      const appointment_type =
        this.job.appointment && this.job?.appointment?.appointment_type
          ? this.appointmentsMap[this.job.appointment.appointment_type]?.name
          : '';
      this.appointment_text = 'No Appointment';
      if (this.job.appointment.range_start !== null && appointment_type !== '') {
        this.appointment_text = `${humaniseDate(this.job.appointment.range_start)} ${appointment_type} ${moment(
          this.job.appointment.range_start
        ).format('HH:mm')}`;
      } else {
        this.appointment_text_color = 'var(--input-placeholder)';
        // if (appointmentInfoEl) this.renderer.setAttribute(appointmentInfoEl, 'style', 'color: var(--input-placeholder)');
      }
  }


  selectMenuItem(job, menuItem) {
    this.svc.router.navigate(['/workflow/detail'], { skipLocationChange: true });
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
  }
}
