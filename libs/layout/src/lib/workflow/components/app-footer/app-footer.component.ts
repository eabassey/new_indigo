import { Component, Input, OnInit } from '@angular/core';
import { tap, delay } from 'rxjs/operators';
import { CoreServices, FooterButtonConfig, NodeConfig } from '@wilo';
import { Observable, of, Subscription } from 'rxjs';
// import { SetCurrentPage } from '@indigo/ux';

@Component({
  selector: 'app-footer',
  templateUrl: 'app-footer.component.html',
  styleUrls: ['app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {
  activeNode$!: Observable<NodeConfig>;
  compInstances: any[] = [];
  compInstancessub!: Subscription | null;
  maxSize = 5;
  constructor(private svc: CoreServices) {}

  ngOnInit() {
    this.activeNode$ = this.svc.footerAccessor.nodeForFooter.pipe(delay(0));
    this.compInstancessub = this.svc.footerAccessor.compInstances.subscribe(instance => {
      this.compInstances = instance;
    });
  }

  setCurrentPage(currentPage: number) {
    this.svc.router.navigate([''], {queryParams: {currentPage}, queryParamsHandling: 'merge'})
  }

  getNavs(node: NodeConfig) {
    return node.navs as FooterButtonConfig[];
  }
}
