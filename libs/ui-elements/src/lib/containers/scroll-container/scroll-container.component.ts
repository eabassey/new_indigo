import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'flx-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXScrollContainerComponent {
  @Input() color = 'default';
  @Input() height = 'auto';
  @Input() maxheight = 'auto';
  @Input() padding = '0';
}
