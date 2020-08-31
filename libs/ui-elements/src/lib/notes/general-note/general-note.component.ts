import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'flx-general-note',
  templateUrl: './general-note.component.html',
  styleUrls: ['./general-note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXGeneralNoteComponent implements OnInit {
  private _note: any;

  @Input() location: string;
  locationClass = 'general-note';

  @Input() currentUser;

  @Input()
  set note(note: any) {
    this._note = note;
  }
  get note() {
    return this._note;
  }

  getRoles(roles) {
    const x = roles.map(b => b.description);
    return x.toString();
  }

  ngOnInit() {
    switch (this.location) {
      case 'action-panel':
        this.locationClass = 'compact';
        break;
      case 'context-menu':
        this.locationClass = 'scattered';
        break;

      default:
        break;
    }
  }
}
