import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'flx-loader-component',
  styleUrls: ['./loader.component.scss'],
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXLoaderComponent implements OnInit, OnDestroy {
  loaderHeight = 30;
  loaderWidth = 90;
  showText = true;
  dotInterval: any;

  @ViewChild('loadingDots', { static: false }) dots: ElementRef;

  @Input() loadingMessage: string = 'Loading';
  @Input() disableBackground: boolean = false;
  @Input() isFullScreen = false;
  // FUTURE Implement
  // @Input() set textEnable: boolean(show: boolean) {
  //   console.log({ TEXXTENABLE: show });
  //   this.showText = show;
  // }
  @Input() set size(s: string) {
    // console.log({ SIZE: s });
    switch (s) {
      case 'small':
        this.loaderHeight = 10;
        this.loaderWidth = 30;
        this.showText = false;
        break;
      case 'medium':
        this.loaderHeight = 20;
        this.loaderWidth = 60;
        break;
      case 'large':
        this.loaderHeight = 30;
        this.loaderWidth = 90;
        break;
      default:
        this.loaderHeight = 30;
        this.loaderWidth = 90;
        break;
    }
  }

  ngOnInit() {
    if (this.showText && this.isFullScreen) {
      this.dotInterval = setInterval(() => {
        if (this.dots.nativeElement.innerHTML.length > 2) {
          this.dots.nativeElement.innerHTML = '';
        } else {
          this.dots.nativeElement.innerHTML += '.';
        }
      }, 250);
    }
  }

  ngOnDestroy() {
    clearInterval(this.dotInterval);
  }
}
