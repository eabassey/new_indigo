import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'flx-success-tick',
  templateUrl: './success-tick.component.html',
  styleUrls: ['./success-tick.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXSuccessTickComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {}
  @Input() autoClose = true;
  @Input() copyText$: Observable<any>;
  @Input() copyTextHeading = 'Claim Number';
  ngOnInit() {}

  ngAfterViewInit() {
    if (this.autoClose) {
      setTimeout(() => {
        this.redirect();
      }, 3000);
    }
  }
  redirect() {
    this.router.navigate(['/workflow'], { skipLocationChange: true });
  }
}
