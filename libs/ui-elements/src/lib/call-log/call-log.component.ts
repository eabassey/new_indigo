import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'flx-call-log',
  templateUrl: './call-log.component.html',
  styleUrls: ['./call-log.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)', opacity: 1 }))
      ]),
      transition(':leave', [animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))])
    ])
  ]
})
export class FLXCallLogComponent implements OnInit {
  isCompact = false;
  isVisible = false;

  @Input() log: {
    message: string;
    direction: string;
    reason: string;
    channel: string;
    date: string;
    time: string;
    state: string;
    authorDetails: {
      name: string;
      contact_number: string;
      email: string;
    };
  } = {
    message: 'This is a message',
    direction: 'out-bound',
    reason: 'N/A',
    channel: 'sms',
    date: '22-10-2020',
    time: '13:05',
    state: '14: Customer Rating',
    authorDetails: {
      name: 'Mike',
      contact_number: '0829039182',
      email: 'e@e.com'
    }
  };

  private _call_log: any;

  @Input() location: string;
  locationClass = 'general-call-log';

  @Input()
  set callLog(log: any) {
    this._call_log = log;
  }
  get callLog() {
    return this.log;
  }

  constructor() {}

  ngOnInit() {
    switch (this.location) {
      case 'action-panel':
        this.locationClass = 'compact';
        this.isCompact = true;
        break;
      case 'context':
        this.locationClass = 'scattered';
        break;

      default:
        break;
    }
  }

  toggleOpen() {
    this.isVisible = !this.isVisible;
  }
}
