import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { returnOrDefault } from '@indigo/utilities';

@Component({
  selector: 'flx-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FLXTextareaComponent),
      multi: true,
    },
  ],
})
export class FLXTextareaComponent implements OnInit, ControlValueAccessor {
  constructor(private _fb: FormBuilder) {}

  private _autoFocus!: boolean;
  private _cols!: number;
  private _disabled!: boolean;
  private _defaultValue = '';
  private _form!: string;
  private _inFocus!: boolean;
  private _textArea!: HTMLTextAreaElement;
  private _maxLength!: number;
  private _name!: string;
  private _placeholder = '';
  private _readonly!: boolean;
  private _rows!: number;
  private _type = 'textarea';
  private _value = '';
  private _wrap!: string;
  private _width!: string;

  @Input() id!: string;

  @ViewChild('inputElement', { static: true })
  set input(input: ElementRef<HTMLTextAreaElement>) {
    // input: ElementRef<HTMLTextAreaElement>;
    this._textArea = input.nativeElement;
  }

  get value() {
    return this._value;
  }

  @Input()
  set defaultValue(dfval: string) {
    this._defaultValue = dfval;
  }
  get defaultValue() {
    return this._defaultValue;
  }

  @Input()
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
  }
  get placeholder() {
    return this._placeholder;
  }

  @Input()
  set type(tp: string) {
    this._type = tp;
  }
  get type() {
    return this._type;
  }

  @Input()
  set wrap(w: string) {
    this._wrap = w;
  }
  get wrap() {
    return this._wrap;
  }

  @Input()
  set name(nm: string) {
    this._name = nm;
  }
  get name() {
    return this._name;
  }

  @Input()
  set cols(cls: number) {
    this._cols = cls;
  }
  get cols() {
    return this._cols;
  }

  @Input()
  set rows(rws: number) {
    this._rows = rws;
  }
  get rows() {
    return this._rows;
  }

  @Input()
  set form(f: string) {
    this._form = f;
  }
  get form() {
    return this._form;
  }

  @Input()
  set autofocus(af: boolean) {
    this._autoFocus = af;
  }
  get autofocus() {
    return this._autoFocus;
  }

  @Input()
  set disabled(disabled: boolean) {
    this._disabled = disabled;
  }
  get disabled() {
    return this._disabled;
  }

  @Input()
  set readonly(ro: boolean) {
    this._readonly = ro;
  }
  get readonly() {
    return this._readonly;
  }

  get styles() {
    return {
      width: this.width,
    };
  }

  @Input()
  set width(w: string) {
    this._width = w;
    //  console.log('Width for text area' + this._width);
  }
  get width() {
    return returnOrDefault(`${this._width}`, '');
  }

  @Input()
  set maxLength(mL: number) {
    this._maxLength = mL;
  }
  get maxLength() {
    return returnOrDefault(this._maxLength, 0);
  }

  get inFocus() {
    return this._inFocus;
  }

  set inFocus(f: boolean) {
    if (this.inFocus === true && f === false) {
      this.touchChanges(true);
    }
    this._inFocus = f;
  }

  ngOnInit() {}

  sendChanges = (_: any) => {};
  touchChanges = (_: boolean) => {};

  writeValue(obj: any): void {
    this._textArea.value = `${obj}`;
  }
  registerOnChange(fn: any): void {
    this.sendChanges = fn;
  }
  registerOnTouched(fn: any): void {
    this.touchChanges = fn;
  }
  setDisabledState?(_isDisabled: boolean): void {
    this.disabled = _isDisabled;
  }

  handleChanges() {
    if (this.inFocus === true && this.sendChanges) {
      this.sendChanges(`${this._textArea.value}`);
      // console.log(this._textArea.value);
    }
  }
}
