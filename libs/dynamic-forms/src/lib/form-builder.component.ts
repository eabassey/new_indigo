import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormModel } from './models';
import {BigFormService} from '@wilo';

@Component({
  selector: 'form-builder',
  template:`
    <form [class]="formModel.classes" [style]="formModel.styles" [formGroup]="bf.bigForm">
      <flx-flex-container direction="row" justifyContent="center" maxWidth="50vw">

        <div *ngFor="let field of formModel.fields">
          <field-builder *ngIf="field" [field]="field" [form]="bf.bigForm"></field-builder>
          <!-- <dynamic-form-builder *ngIf="field.kind === 'group'" [fields]="field.fields" [groupName]="field.name"></dynamic-form-builder> -->
        </div>
      </flx-flex-container>
    </form>
  `,
})
export class FormBuilderComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  @Input() formModel: FormModel;
  @Input() groupName: string;
  unsubcribe: any
  constructor(public bf: BigFormService) { }

  ngOnInit() {
    console.log({FM: this.formModel});
    this.unsubcribe = this.bf.bigForm?.valueChanges.subscribe((update) => {
      console.log({update});
    });
  }

  ngDestroy() {
    this.unsubcribe();
  }
}
