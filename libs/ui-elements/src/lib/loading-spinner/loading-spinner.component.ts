import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'flx-loading-spinner',
  styleUrls: ['./loading-spinner.component.scss'],
  templateUrl: './loading-spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FLXLoadingSpinnerComponent {
  @Input() type: string;
}
