import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password,
@Component({
    selector: 'textbox',
    template: `
      <div [formGroup]="form">
        <input [disabled]="disabled" [attr.type]="field.type"  [id]="field.name" [name]="field.name" [formControlName]="field.name" />
      </div>
    `
})
export class TextBoxComponent {
    @Input() field: any = {};
    @Input() form: FormGroup;
    @Input() disabled: boolean;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }

    constructor() {

    }
}
