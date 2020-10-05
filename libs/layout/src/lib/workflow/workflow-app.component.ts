import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreServices, AppBase } from '@wilo';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
    selector: 'workflow-app',
    template: `
       <main>
       <!-- <h1 *ngIf="loading$ | async">LOADING ...</h1> -->
            <router-outlet></router-outlet>
            <flx-loader-component
                  isFullScreen="true"
                  *ngIf="loading$ | async"
                  [disableBackground]="disableBackground"
                ></flx-loader-component>
        </main>
    `,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['workflow-app.component.scss']
})
export class WorkflowAppComponent extends AppBase {
  loading$: Observable<boolean>;
    disableBackground = true;
    constructor(svc: CoreServices, route: ActivatedRoute, router: Router) {
        super(svc, route, router);
        this.loading$ = svc.loader.loading$;
    }
}
