import { Component, Input, OnInit } from '@angular/core';
import { tap, delay } from 'rxjs/operators';
import { CoreServices } from '@indigo/engine';
// import { SetCurrentPage } from '@indigo/ux';

@Component({
  selector: 'app-footer',
  templateUrl: 'app-footer.component.html',
  styleUrls: ['app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {
  activeNode$;
  compInstances$;
  constructor(private svc: CoreServices) {}

  ngOnInit() {
    this.activeNode$ = this.svc.footerAccessor.nodeForFooter.pipe(delay(0),tap(xy => console.log({xy})));
    this.compInstances$ = this.svc.footerAccessor.compInstances;
  }

  setCurrentPage(currentPage: number) {
    this.svc.router.navigate([''], {queryParams: {currentPage}, queryParamsHandling: 'merge'})
  }
}
