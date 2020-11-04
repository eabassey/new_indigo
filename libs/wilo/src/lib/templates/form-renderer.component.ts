import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BigFormService } from '../services';



@Component({
    selector: 'form-renderer',
    template: `
    Test Form
    <!-- <form>
            <h2 *ngFor="let p of (test$ | async)">{{p | json}}</h2>
         <dynamic-primeng-form [group]="bf?.bigForm" [model]="formModel" (change)="onChange($event)"></dynamic-primeng-form>
    </form> -->
    `,
    styleUrls: []
})
export class FormRendererComponent implements OnInit {
    @Input() formModel: any;
    @Input() test$: Observable<any>;
    constructor(public bf: BigFormService) {}

    ngOnInit() {
    }

    onChange(ev) {
        console.log({OnChange: ev});
    }
}
