import { Component, Input, OnInit } from "@angular/core";
import {Observable} from 'rxjs';
import { CoreServices } from '@wilo';
import { map } from 'rxjs/operators';



@Component({
    selector: 'main-list',
    template: `
    <div
    class="workflow-shell"
    [ngClass]="{
        'local-workflow-push': opened,
        'search-panel-padding': hasSearchValues
    }"
    >
        <ng-container>
            <ng-container *ngIf="(list$ | async) as items">
                <ng-container *ngIf="items.length >= 1">
                <div
                *ngFor="let item of (items | paginate: { itemsPerPage: pageSize, currentPage: (currentPage$ | async), id: 'list' }); index as i; trackBy: trackByFunc"
                >
                    <item-one-card [itemOne]="item"></item-one-card>
                </div>
                </ng-container>
            </ng-container>
        </ng-container>
    </div>
    `,
    styles: [`
    :host {
        width: 100%;
        }
        .workflow-shell {
        margin-bottom: 6rem;
        width: 100%;
        &.search-panel-padding {
            padding-top: 2rem;
        }
        }

        // .flx-pagination /deep/ .ngx-pagination .small-screen {
        //   display: none;
        // }
        .side-header-icon {
        display: flex;
        align-items: center;
        // background-color: #4d4b4b;
        }

        .search-page {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: var(--app-menu);
        box-sizing: border-box; //TODO: Create shadow mixin
        box-shadow: 5px 15px 15px -5px rgba(#2c2b2b, 0.25);
        // border-bottom-right-radius: 0.3rem;
        position: fixed;
        padding: 0.5rem;
        top: 3.5rem;
        left: 0;
        z-index: 4;
        transition: all 350ms;
        width: 100%;
        float: right;

        &.opened {
            opacity: 1;
            left: 0;
        }

        &.closed {
            opacity: 0;
            left: -300px;
        }
        }

        .search-form {
        display: flex;
        flex-direction: row;
        margin-right: 30px;
        }

        .nav-closed {
        display: none;
        }

        .clear-input-local {
        margin: 15px;
        }

        .local-workflow-push {
        margin-top: 62px;
        }

        .button-align {
        align-content: center;
        }
        .pagination-container {
        background-color: var(--bar);
        box-shadow: 0px -7px 22px 2px rgba(0, 0, 0, 0.63);
        padding: 0.1rem;
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 4;

        .small-screen {
            display: none;
        }
        }

        .center-load {
        margin: 0 auto;
        }

        @media only screen and (max-width: 680px) {
        .search-page {
            flex-direction: column;
        }
        .search-form {
            margin-bottom: 20px;
        }
        }

        .active-item {
        // position: absolute;
        // top: 10px;
        // right: 10px;
        padding: 5px;
        border-radius: 100%;
        background: #767770;
        // color: white;
        }

    `]
})
export class MainListComponent implements OnInit {
    opened = false;
    hasSearchValues = false;
    @Input() list$: Observable<any>;
    currentPage$;
    pageSize = 30;
    constructor(private svc: CoreServices) {}

    ngOnInit() {
        this.currentPage$ = this.svc.route.queryParamMap.pipe(map(paramMap => paramMap.get('currentPage') || 1))
    }

    trackByFunc(idx, item) {
        return item.id;
      }
}
