import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password,
@Component({
    selector: 'textarea-input',
    template: `
      <div [formGroup]="form">
      <textarea [disabled]="disabled" [class]="field.controlClasses" [class.is-invalid]="isDirty && !isValid" [formControlName]="field.name" [id]="field.name"
        [rows]="field.rows" [cols]="field.cols" class="form-control" [placeholder]="field.placeholder" ></textarea>
      </div>
    `
})
export class TextAreaInputComponent {
    @Input() field: any = {};
    @Input() form!: FormGroup;
    @Input() disabled: boolean = false;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }

    constructor() {

    }
}
