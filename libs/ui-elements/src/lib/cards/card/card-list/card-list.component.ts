import { Component, Input } from '@angular/core';

export interface FLXCardListConfig {
  type?: 'vertical' | 'horizontal';
}

export const defaultERCardListConfig: FLXCardListConfig = {};
@Component({
  selector: 'flx-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class FLXCardListComponent {
  private _config!: FLXCardListConfig;

  @Input() set type(type: string) {}
}
