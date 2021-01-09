import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'flx-no-results',
  styleUrls: ['./no-results.component.scss'],
  templateUrl: './no-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FLXNoResultsComponent {
  @Input() message!: string;
  constructor() {}
}
