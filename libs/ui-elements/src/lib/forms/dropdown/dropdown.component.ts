import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ValidatorFn,
  NG_VALIDATORS,
  Validator,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { returnOrDefault, CustomValidators } from '@indigo/utilities';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'flx-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FLXDropdownComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => FLXDropdownComponent)
    }
  ]
})
export class FLXDropdownComponent implements OnInit, ControlValueAccessor, Validator, OnDestroy {
  // dummies: Dummy[];
  visible = false;
  lstSelectedItem: any[];
  lstItemOptions: any[];
  lstItemDataSet: any[];
  lstBackgroundColor: string;
  value: any;
  selected = false;

  textColor: string;
  selectedBGColor: string;
  filterForm: FormGroup;
  public styleClasses: {
    sizeClass?: string;
    shapeClass?: string;
    colorClass?: string;
  } = {};
  // -------------------------------- Internal Variables ------------------------------
  private _autofocus: boolean;
  private _disabled: boolean;
  private _form: string;
  private _id: string;
  private _multiple: boolean;
  private _name: string;
  private _readonly: boolean;
  private _required: boolean;
  private _size: number;
  private _placeHolder: string;
  private _onValidatorChange: Function;
  private _recalculate = true;
  private _currentComposedValidator: ValidatorFn;
  private _upperItemCountLimit: number;
  private _lowerItemCountLimit: number;
  private _autoOpen: boolean;
  private _margin: any;
  private _width: any;
  // private _autofocus: boolean;
  private _search: boolean;
  private _subscription: Subscription;
  private _isItemSelected: boolean;

  @ViewChild('mySelectOptions', { static: false }) mySelectOptions;
  @ViewChild('inputEl', { static: false }) inputEl;

  @Input()
  set width(val: any) {
    this._width = val;
  }

  get width() {
    return this._width;
  }

  set margin(val: any) {
    this._margin = val;
  }

  get margin() {
    return this._margin || 'auto';
  }

  // -------------------------------- Function Variables ------------------------------
  @Input()
  displayOptions: {
    displayKey: string;
    valueKey: string;
  } = { displayKey: 'display', valueKey: 'value' };

  @Output()
  itemsSelected = new EventEmitter();

  sendChanges = (item: any) => {};
  touchChanges = (_: boolean) => {};

  // =================================== INPUTS========================================
  @Input()
  set upperItemCountLimit(val: number) {
    this._recalculate = true;
    this._upperItemCountLimit = val;
  }

  get upperItemCountLimit() {
    return returnOrDefault(this._upperItemCountLimit, -1);
  }

  @Input()
  set lowerItemCountLimit(val: number) {
    this._recalculate = true;
    this._lowerItemCountLimit = val;
  }

  get lowerItemCountLimit() {
    return returnOrDefault(this._lowerItemCountLimit, 0);
  }

  @Input()
  set itemsOption(val: any[]) {
    if (JSON.stringify(this.lstItemOptions) !== JSON.stringify(val)) {
      this.lstItemOptions = val;
      this.lstItemDataSet = this.lstItemOptions;
      if (this.filterForm && this.filterForm.get('searchFilter'))
        this.filterForm.get('searchFilter').setValue('', { emitEvent: false });
    }
  }
  @Input()
  set disabled(disabled: boolean) {
    this._disabled = `${disabled}` === 'true' ? true : false;
  }
  get disabled() {
    return returnOrDefault(this._disabled, false);
  }
  @Input()
  set isDisabled(disabled: boolean) {
    // Angular complains about the disabled property when using in a form, to bypass the warning use this.
    this._disabled = `${disabled}` === 'true' ? true : false;
    this.disabled = this._disabled;
  }
  get isDisabled() {
    return returnOrDefault(this._disabled, false);
  }
  @Input()
  set form(form: string) {
    this._form = form;
  }
  get form() {
    return returnOrDefault(this._form, '');
  }
  @Input()
  set id(id: string) {
    this._id = id;
  }
  get id() {
    return returnOrDefault(this._id, '');
  }
  @Input()
  set isItemSelected(isItemSelected: boolean) {
    this._isItemSelected = isItemSelected;
  }
  get isItemSelected() {
    return returnOrDefault(this._isItemSelected, false);
  }
  @Input()
  set multiple(multiple: boolean) {
    if (`${multiple}` === 'true') {
      this._recalculate = true;
    }
    this._multiple = `${multiple}` === 'true' ? true : false;
  }
  get multiple() {
    return this._multiple;
  }

  get arrClasses() {
    return Object.values(this.styleClasses);
  }
  @Input()
  set placeHolder(val: string) {
    this._placeHolder = val;
    this.value = val;
  }
  get placeHolder() {
    return returnOrDefault(this._placeHolder, 'Select Item');
  }
  @Input()
  set required(required: boolean) {
    this._recalculate = true;
    this._required = required;
  }
  get required() {
    return returnOrDefault(this._required, false);
  }
  @Input()
  set searchEnabled(searchEnabled: boolean) {
    this._search = `${searchEnabled}` === 'true' ? true : false;
  }
  get searchEnabled() {
    return returnOrDefault(this._search, true);
  }
  @Input()
  set autoOpen(open: boolean) {
    this._autoOpen = `${open}` === 'true' ? true : false;
    this.visible = this._autoOpen;
  }
  get autoOpen() {
    return returnOrDefault(this._autoOpen, false);
  }

  setBGColor(val: string) {
    this.lstBackgroundColor = val;
  }
  getBGColor() {
    return this.lstBackgroundColor;
  }
  getColor() {
    return this.textColor;
  }
  // ------------------------------ Reactive-Form Methods ------------------------------\\
  writeValue(obj: any): void {
    this.value = obj === '' || obj === undefined || obj === null ? this.placeHolder : obj; //obj;
    if (!isNaN(obj) && obj !== null && this.lstItemOptions !== null && this.lstItemOptions) {
      const data = this.lstItemOptions.find(val => {
        if (typeof val[this.displayOptions.valueKey] === 'number') {
          return val[this.displayOptions.valueKey] === Number(obj);
        } else if (typeof val[this.displayOptions.valueKey] === 'string') {
          return val[this.displayOptions.valueKey] === obj.toString();
        }
      });
      if (data !== undefined) {
        this.selected = true;
        this.value = data[this.displayOptions.displayKey];
      } else {
        this.value = obj;
      }
    }
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
  handleChanges(value) {
    this.sendChanges(value);
  }
  validate(c: AbstractControl): ValidationErrors {
    if (this._recalculate === true) {
      const validatorArray: ValidatorFn[] = [];

      this._recalculate = false;

      if (`${this.multiple}` === 'true') {
        validatorArray.push(CustomValidators.selectMaxItemLimit(this.upperItemCountLimit));

        validatorArray.push(CustomValidators.selectMinItemLimit(this.lowerItemCountLimit));
      } else {
        validatorArray.push(CustomValidators.ignoreValidation());
      }

      if (this.required === true) {
        validatorArray.push(Validators.required);
      }

      this._currentComposedValidator = Validators.compose(validatorArray);
    }
    return this._currentComposedValidator(c);
  }

  registerOnValidatorChange?(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  // ----------------------------------- LIFECYCLE HOOKS --------------------------------|
  constructor(public cd: ChangeDetectorRef) {
    this.lstItemDataSet = this.lstItemOptions;
  }
  open() {
    this.visible = this.visible ? false : true;
  }
  _openOptions() {
    if (this.visible) {
      this.mySelectOptions.open();
      this.mySelectOptions.backdropClass = '';
    } else {
      this.mySelectOptions.close();
    }
  }

  onItemSelected(item) {
    this.selected = true;
    if (`${this._multiple}` === 'true') {
      this.lstSelectedItem = this.combineArray(this.lstSelectedItem, [item]);
      this.itemsSelected.emit(this.lstSelectedItem.map(entry => entry[this.displayOptions.valueKey]));
      this.sendChanges(this.lstSelectedItem.map(entry => entry[this.displayOptions.valueKey]));
    } else {
      const displayName = item[this.displayOptions.displayKey];
      this.writeValue(displayName);
      this.visible = false;
      this.itemsSelected.emit(item[this.displayOptions.valueKey]);
      this.mySelectOptions.close();
      this.sendChanges(item[this.displayOptions.valueKey]);
    }
  }

  combineArray(array1: any[], array: any[]) {
    if (array1 !== undefined) {
      if (array1.length === this._upperItemCountLimit) {
        return array1;
      }
      const newLst = array1.filter(i => {
        return i[this.displayOptions.valueKey] === array[0][this.displayOptions.valueKey];
      });
      if (newLst.length === 0) return [...array1, ...array];
      else return array1;
    } else {
      return array;
    }
  }
  searchFilter(value: string): void {
    this.lstItemDataSet = [];
    this.lstItemDataSet = this.lstItemOptions.filter(data =>
      data[this.displayOptions.displayKey].toLowerCase().match(value.toLowerCase())
    );
    this.cd.detectChanges();
  }
  removeSelectedItem(selected) {
    this.lstSelectedItem = this.lstSelectedItem.filter(
      item => item[this.displayOptions.valueKey] !== selected[this.displayOptions.valueKey]
    );
    this.sendChanges(this.lstSelectedItem.map(entry => entry[this.displayOptions.valueKey]));
  }

  ngOnInit() {
    // this.visible = false;
    this._multiple = this._multiple === undefined ? false : this._multiple;
    this.filterForm = new FormGroup({
      searchFilter: new FormControl()
    });
    // if (this.autoOpen) {
    //   this.mySelectOptions.open();
    // }
    this.lstItemDataSet = this.lstItemOptions;
    this.onChanges();
  }

  dismissPopup() {
    // console.log(this.mySelectOptions.open());
    if (this.mySelectOptions)
      this.mySelectOptions.backDropClick().subscribe(() => {
        this.visible = false;
      });
  }

  onChanges(): void {
    if (this._subscription) this._subscription.unsubscribe();
    this._subscription = this.filterForm
      .get('searchFilter')
      .valueChanges.pipe(debounceTime(350))
      .subscribe(val => {
        if (val) {
          this.searchFilter(val);
        } else {
          this.lstItemDataSet = this.lstItemOptions;
          this.cd.detectChanges();
        }
      });
  }

  ngOnDestroy() {
    if (this._subscription) this._subscription.unsubscribe();
  }
}
