import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreServices, NodeFooterBase } from '@wilo';


@Component({
    selector: 'workflow-node-footer',
    template: `
        <div class="footer-nav" *ngFor="let nav of navs">
          <div class="footer-nav-left">
            <node-footer-button *ngIf="nav.location === 'left'" [nav]="nav" [compInstances]="compInstances"></node-footer-button>
          </div>
          <div class="footer-nav-center">
            <node-footer-button *ngIf="nav.location === 'center'" [nav]="nav" [compInstances]="compInstances"></node-footer-button>
          </div>
          <div class="footer-nav-right">
            <node-footer-button *ngIf="!nav.location || nav.location === 'right'" [nav]="nav" [compInstances]="compInstances"></node-footer-button>
          </div>
        </div>
    `,
    styles:[`
      :host {
  display: flex;
  width: 100%;
  height: 100%;
}
.footer-nav {
  display: flex;
  width: 100%;
  align-items: center;

  .footer-nav-left,
  .footer-nav-center,
  .footer-nav-right {
    display: flex;
    flex-grow: 1;
  }

  .footer-nav-left {
    justify-content: flex-start;
  }

  .footer-nav-center {
    justify-content: center;
  }

  .footer-nav-right {
    justify-content: flex-end;
  }

  .dont-display {
    display: none;
  }
}
    `]
})
export class WorkflowNodeFooterComponent extends NodeFooterBase {

    constructor(svc: CoreServices, route: ActivatedRoute) {
        super(svc, route);
    }


}
