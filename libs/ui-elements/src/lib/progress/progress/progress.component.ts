import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'flx-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FLXProgressComponent implements OnInit {
  private _unit = '%';


  unitCount!: number;
  maxinput!: number;
  width!: string;
  valueinput!: number;
  modeClass = '';
  progressClass = '';
  // isPercentage: boolean ;
  displayUnit!: boolean;
  displayMax!: boolean;

  isMetricRequired = false;

  @Input() set unit(u: string) {
    this._unit = u;
  }

  @Input() set value(val: number) {
    this.valueinput = val;
    this.calcWidth();
  }

  @Input() set max(max) {
    this.maxinput = !isNaN(parseFloat(max)) ? parseFloat(max) : 100;
    this.calcWidth();
  }

  private _determineDisplay() {
    this.displayUnit = !(this.maxinput !== 100 && this._unit === '%');

    this.displayMax = !(this.unit !== '%' || this.maxinput !== 100);
  }

  get max() {
    if (this.displayMax === true) {
      return `/${this.maxinput}`;
    } else {
      return '';
    }
  }
  get unit() {
    if (this.displayUnit === true) {
      return ` ${this._unit}`;
    } else {
      return '';
    }
  }

  @Input() set mode(mode: string) {
    if (mode === 'thin') {
      this.modeClass = 'er-progress-container-thin';
      this.progressClass = 'er-progress-bar-thin';
    } else if (mode === 'full') {
      this.modeClass = 'er-progress-container';
      this.progressClass = 'er-progress-bar';
      this.isMetricRequired = false;
    } else if (mode === 'full-metric') {
      this.modeClass = 'er-progress-container';
      this.progressClass = 'er-progress-bar-full-metric';
      this.isMetricRequired = true;
    } else {
      this.modeClass = 'default';
    }
  }

  private calcWidth() {
    if ((this.maxinput = 100)) {
      this.width = this.valueinput !== undefined ? ((this.valueinput * this.maxinput) / this.maxinput).toPrecision(3) : '0';
    } else {
      this.unitCount = 100 / this.maxinput;
      this.width = (this.unitCount * this.valueinput).toPrecision(3);
    }
  }

  @Input() set height(heightvalue: string) {
    this.height = heightvalue;
  }

  ngOnInit() {
    this.displayMax = true;
    this.displayUnit = false;
    this.maxinput = 100;
    this._unit = '%';
  }
}
