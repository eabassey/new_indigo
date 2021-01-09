import { Component, forwardRef, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { cleanUpSub } from '@indigo/utilities';

export interface SearchBarValue {
  checkClosed: boolean;
  inSearch: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'flx-search-bar',
  styleUrls: ['./search-bar.component.scss'],
  templateUrl: './search-bar.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBarComponent),
      multi: true
    }
  ]
})
export class SearchBarComponent implements ControlValueAccessor, OnInit, OnDestroy {
  internalForm: FormGroup = new FormGroup({
    checkClosed: new FormControl(false),
    inSearch: new FormControl('', [Validators.minLength(4)])
  });
  disabled = false;
  internalFormSub!: Subscription;
  private _onTouch!: () => void;
  private _onChange!: (obj: any) => void;
  // toggleOptions = ['offline', 'online'];
  @Output() clear = new EventEmitter();
  @Output() doSearch = new EventEmitter();
  @Input() prompt = '';
  clearForm() {
    this.clear.emit('clearSearch');
  }
  ngOnInit() {
    this.internalFormSub = this.internalForm.valueChanges.subscribe(changes => {
      if (!!this._onChange && !!this._onTouch && this.disabled === false) {
        this._onChange(changes);
        this._onTouch();
      }
    });
  }

  sendSearch() {
    this.doSearch.emit('search');
  }

  ngOnDestroy() {
    cleanUpSub(this.internalFormSub);
  }

  // ====================== Control Value Accessor Methods ================================
  writeValue(obj: { checkClosed?: boolean; inSearch?: string }): void {
    if (!!obj) {
      this.internalForm.patchValue(obj);
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.internalForm.enable();
    } else {
      this.internalForm.disable();
    }
  }
}
