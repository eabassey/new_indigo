import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'flx-loading-spinner-inline',
  styleUrls: ['./loading-spinner-inline.component.scss'],
  templateUrl: './loading-spinner-inline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXLoadingSpinnerInlineComponent {
  @Input() type: string;
}
