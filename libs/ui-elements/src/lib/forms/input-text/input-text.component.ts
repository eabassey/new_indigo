import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
  HostListener,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  Validators,
  ValidatorFn
} from '@angular/forms';

import { returnOrDefault, checkNullUndefined, CustomValidators } from '@indigo/utilities';
import { DroppableFormControl } from '../drag-drop';
import { debounceTime, take, filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
/**
 * <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
 */

export const RIGHT_ARROW_SVG = [
  {
    type: 'path',
    props: {
      fill: 'none',
      d: 'M0 0h24v24H0z'
    }
  },
  {
    type: 'path',
    props: {
      d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z'
    }
  }
];
// `
// <path />
// <path />
// `;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'flx-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FLXInputTextComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => FLXInputTextComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/*
 ****
 * Purpose: General purpose text input
 * Dependencies: @indigo/shared , @angular/forms
 * Author: Hardus Lourens / multiple / 4-Sure
 * Date:
 *
 */
export class FLXInputTextComponent extends DroppableFormControl implements OnInit, Validator, AfterViewInit, OnDestroy {
  dropReceiver = false;

  public styleClasses: {
    sizeClass?: string;
    shapeClass?: string;
    colorClass?: string;
    inputClass?: string;
    labelClass?: string;
    setColor?: string;
  } = {};

  // ---------------------------------------- Internal Variables ------------------------------------------
  private _autocomplete: boolean;
  private _autofocus: boolean;
  private _disabled: boolean;
  private _collapsable: boolean;
  // private _formControlName: string;
  private _id: string;
  private _inFocus: boolean;
  private _input: HTMLInputElement;
  private _maxLength: number;
  // private _name: string;
  private _noFutureDate: boolean;
  private _noEndingSpace: boolean;
  private _open: boolean;
  private _onValidatorChange: Function;
  private _pattern: string;
  private _placeholder: string;
  private _readonly: boolean;
  private _required: boolean;
  private _svgContent: string;
  private _type: string;
  private _tabIndex = -1;
  private _svg: SVGElement;
  private _radius: string;

  private _recalculate = true;
  private _decimal: number;
  private _margin: any;
  private _width: any;
  private _currentComposedValidator: ValidatorFn;
  private _mustRemoveNonAsciiChars = true;
  private _onlyValidPhoneChars;
  private _valueChangeSubscription: Subscription;

  // ------------------------------------------ Function Variables --------------------------------------------------
  sendChanges: (_: any) => {};
  touchChanges: () => {};
  // ============================================= Inputs ============================================================

  @Input()
  set width(val: any) {
    this._width = val;
  }

  get width() {
    return this._width;
  }

  @Input()
  set radius(val: string) {
    this._radius = val;
  }

  get radius() {
    return this._radius || '4px';
  }

  @Input()
  set margin(val: any) {
    this._margin = val;
  }

  get margin() {
    return this._margin || '0 0 8px 0';
  }

  @Input()
  set mustRemoveNonAsciiChars(val: boolean) {
    this._mustRemoveNonAsciiChars = val;
  }

  get mustRemoveNonAsciiChars() {
    return this._mustRemoveNonAsciiChars;
  }

  @Input()
  set onlyValidPhoneChars(val: boolean) {
    this._onlyValidPhoneChars = val;
  }

  get onlyValidPhoneChars() {
    return this._onlyValidPhoneChars;
  }

  @Input()
  set autocomplete(val: string | boolean) {
    this._autocomplete = /(true)/gi.test(`${val}`);
  }

  get autocomplete() {
    return returnOrDefault(!this._autocomplete ? 'off' : true, 'off');
  }

  @Input()
  set autofocus(val: boolean) {
    this._autofocus = val;
  }
  get autofocus() {
    return returnOrDefault(this._autofocus, false);
  }

  @Input()
  set collapsable(val) {
    if (!this._collapsable) {
      this._collapsable = true;
      // this._addSvg();
    }
  }

  get collapsable() {
    return this._collapsable;
  }

  @Input()
  set disabled(disabled: boolean) {
    this._disabled = disabled;
  }
  get disabled() {
    return returnOrDefault(this._disabled, false);
  }

  @Input()
  set isDisabled(disabled: boolean) {
    this._disabled = disabled;
  }
  get isDisabled() {
    return returnOrDefault(this._disabled, false);
  }

  @Input()
  set id(id: string) {
    this._id = id;
  }
  get id() {
    return returnOrDefault(this._id);
  }

  @Input()
  set maxLength(maxlength: number) {
    this._recalculate = true;
    this._maxLength = maxlength;
  }
  get maxLength() {
    // return this._maxLength ? this._maxLength : 524288;
    return returnOrDefault(this._maxLength, 60);
  }

  @Input()
  set noFutureDate(v: boolean) {
    this._recalculate = true;
    this._noFutureDate = v;
  }
  get noFutureDate() {
    return returnOrDefault(this._noFutureDate, false);
  }

  @Input()
  set noEndingSpace(v: boolean) {
    this._recalculate = true;
    this._noEndingSpace = v;
  }
  get noEndingSpace() {
    return returnOrDefault(this._noEndingSpace, true);
  }

  @Input()
  set pattern(pattern: string) {
    this._recalculate = true;
    this._pattern = pattern;
  }
  get pattern() {
    return returnOrDefault(this._pattern, '');
  }

  @Input()
  set placeholder(val: string) {
    this._placeholder = val;
  }
  get placeholder() {
    return returnOrDefault(this._placeholder, '');
  }

  @Input()
  set readonly(readonly: boolean) {
    this._readonly = readonly;
  }
  get readonly() {
    return this._readonly ? this._readonly : false;
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
  set size(val: string) {
    switch (val) {
      case 'tiny':
        this.styleClasses.sizeClass = 'tiny';
        break;
      case 'small':
        this.styleClasses.sizeClass = 'small';
        break;
      case 'normal':
        this.styleClasses.sizeClass = 'normal';
        break;
      case 'normalShallow':
        this.styleClasses.sizeClass = 'normalShallow';
        break;
      case 'medium':
        this.styleClasses.sizeClass = 'medium';
        break;
      case 'large':
        this.styleClasses.sizeClass = 'large';
        break;
    }
  }
  get size() {
    return this.size ? this.size : 'normal';
  }

  @Input()
  set shape(val: string) {
    if (val === 'rounded') {
      this.styleClasses.shapeClass = 'round';
    } else {
      this.styleClasses.shapeClass = 'rectangular';
    }
  }
  get shape() {
    return this.styleClasses.shapeClass ? this.styleClasses.shapeClass : 'rectangular';
  }

  @Input()
  set inputClass(val: string) {
    this.styleClasses.inputClass = val;
  }
  get inputClass() {
    return this.styleClasses.inputClass ? this.styleClasses.shapeClass : '';
  }

  // @Input()
  // set mustIncludeWhiteSpaces(val: boolean) {
  //   this.styleClasses.inputClass = val;
  // }
  // get inpumustIncludeWhiteSpacestClass() {
  //   return this.styleClasses.inputClass ? this.styleClasses.shapeClass : '';
  // }

  @Input()
  set svgContent(content: string) {
    this._svgContent = content;
  }

  get svgContent() {
    return returnOrDefault<any>(this._svgContent, RIGHT_ARROW_SVG);
  }

  @Input()
  set type(val: string) {
    this._recalculate = true;
    switch (val) {
      default:
        break;
      case 'password':
        this._type = 'password';
        break;
      case 'text':
        this._type = 'text';
        break;
      case 'tel':
        this._type = 'tel';
        break;
      case 'contact_number':
        this._type = 'contact_number';
        break;
      case 'email':
        this._type = 'email';
        break;
      case 'number':
        this._type = 'number';
        break;
      case 'date':
        this._type = 'date';
        break;
      case 'currency':
        this._type = 'currency';
        break;
      case 'time':
        this._type = 'time';
        break;
    }
  }

  get type() {
    return this._type ? this._type : 'text';
  }

  @Input()
  set tabIndex(tabindex: number) {
    this._tabIndex = tabindex;
  }
  get tabIndex() {
    return this._tabIndex ? this._tabIndex : 0;
  }

  set clickableSVG(svg: SVGElement) {
    svg.addEventListener('click', () => {
      this.open = !this.open;
      // console.log('click');
    });
    // console.log(svg);
    this._svg = svg;
  }
  get clickableSVG() {
    return this._svg;
  }

  @ViewChild('inputElement', { static: true })
  set inputElement(e: ElementRef) {
    this._input = e.nativeElement;
    if (this.type === 'date') {
      this._renderer.setAttribute(e.nativeElement, 'max', '9999-12-31T00:00');
    }
  }

  @ViewChild('inputContainer', { static: true }) inputContainer: ElementRef<HTMLDivElement>;

  // ============================================= Get/Sets ===========================================================

  get arrClasses() {
    return Object.values(this.styleClasses);
  }

  set inFocus(f: boolean) {
    if (this.inFocus === true && f === false && this.touchChanges) {
      this.touchChanges();
    }
    if (f === false && this._type === 'currency' && this._decimal !== 0) {
      this.convertCurrencyToDecimal();
    }
    this._inFocus = f;
  }

  get inFocus() {
    return this._inFocus;
  }

  set open(val: boolean) {
    this._open = val;
  }

  get open() {
    return returnOrDefault(this._open, this.collapsable ? false : true);
  }

  @Input()
  set decimal(value: number) {
    this._decimal = value;
  }
  get decimal() {
    return returnOrDefault(this._decimal, 0);
  }

  // ============================================= Outputs ============================================================
  // ============================================ Constructor =========================================================
  constructor(private _renderer: Renderer2, private cdr: ChangeDetectorRef) {
    super();
  }
  // ============================================= Methods ============================================================
  handleChanges() {
    if (this.mustRemoveNonAsciiChars) {
      this._input.value = this._input.value.replace(/[^\x00-\x7F]/g, '');
    }
    if (this.onlyValidPhoneChars) {
      this._input.value = this._input.value.replace(/[^+() \-0-9]/g, '');
    }
    this.sendChanges(this._input.value);
  }

  processDrop(dragData: string) {
    this.writeValue(dragData);
    this._input.focus();
    this.handleChanges();
  }

  convertCurrencyToDecimal() {
    this._input.value = Number(this._input.value).toFixed(this._decimal);
    // The below line is interfering with the dynamic button service
    // this.handleChanges();
  }

  onPaste(e: ClipboardEvent) {
    // the bellow is needed to stop the event propagating further
    e.preventDefault();
    e.stopImmediatePropagation();
    e.cancelBubble = true;

    // bellow is to follow normal change process in the case of pasting data after trimming off the excess poop
    this.writeValue(e.clipboardData.getData('Text').trim());
    this.handleChanges();
  }
  // ------------------------------------------ Internal Methods ------------------------------------------

  private _addSvg() {
    // console.log('adding');
    // console.log(this.inputContainer);
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    const svgElement: SVGElement = this._renderer.createElement('svg', 'svg');
    // const svgText = this._renderer.createText(RIGHT_ARROW_SVG);
    // this._renderer.appendChild(svgElement, svgText);

    this._renderer.setAttribute(svgElement, 'xmlns', 'http://www.w3.org/2000/svg');
    this._renderer.setAttribute(svgElement, 'viewBox', '0 0 24 24');

    // putting together the child elements
    RIGHT_ARROW_SVG.forEach(elementDescObject => {
      const subObj = this._renderer.createElement(elementDescObject.type, 'svg');
      Object.keys(elementDescObject.props).forEach((propKey: string) => {
        this._renderer.setAttribute(subObj, propKey, elementDescObject.props[propKey]);
        this._renderer.appendChild(svgElement, subObj);
      });
    });

    this._renderer.addClass(svgElement, 'er-input-collapse-svg');
    this._renderer.addClass(svgElement, `er-input-collapse-svg-normal`);

    this._renderer.appendChild(this.inputContainer.nativeElement, svgElement);
    this.clickableSVG = svgElement;
  }

  // ----------------------------------------- Life-cycle methods -----------------------------------------
  ngOnInit() {}

  ngAfterViewInit() {
    // console.log('adding');
    if (this.collapsable) {
      this._addSvg();
    }

    if (this._type === 'currency' && this._decimal !== 0) {
      // Timeout for initial values to populate, then format for decimal values
      setTimeout(() => {
        if (this._input.value !== '') {
          this.convertCurrencyToDecimal();
        }
      }, 200);
    }
  }

  ngOnDestroy() {
    if (this._valueChangeSubscription) this._valueChangeSubscription.unsubscribe();
  }

  // ----------------------------------------- Reactive-Form Methods --------------------------------------
  trimSpaces() {
    this._input.value = this._input.value.trim();
  }

  writeValue(obj: any): void {
    this._input.value = obj;
  }
  registerOnChange(fn: any): void {
    this.sendChanges = fn;
  }
  registerOnTouched(fn: any): void {
    this.touchChanges = fn;
  }
  setDisabledState?(_isDisabled: boolean): void {
    this.disabled = _isDisabled;
    this.cdr.detectChanges();
  }
  // ------------------------------------------ Validation Methods ----------------------------------------
  validate(c: AbstractControl): ValidationErrors {
    if (c && c.value !== null && c.value !== undefined) {
      if (this._valueChangeSubscription) this._valueChangeSubscription.unsubscribe();
      this._valueChangeSubscription = c.valueChanges
        .pipe(
          debounceTime(1200),
          take(1),
          filter(x => !!x)
        )
        .subscribe(newVal => {
          if (!!newVal) {
            c.setValue(newVal.trim(), { emitEvent: false });
          }
        });
    }

    const type = this.type;

    if (this._recalculate === true) {
      let validatorArray: ValidatorFn[] = [];

      this._recalculate = false;
      switch (type) {
        case 'password':
          this._type = 'password';
          validatorArray = [CustomValidators.hardMaxLength(this.maxLength === 60 ? 128 : this.maxLength)];
          break;
        case 'text':
          this._type = 'text';
          validatorArray = [CustomValidators.hardMaxLength(this.maxLength)];
          break;
        case 'tel':
          this._type = 'tel';
          validatorArray = [CustomValidators.hardMaxLength(this.maxLength), CustomValidators.cellphone];
          break;
        case 'contact_number':
          this._type = 'contact_number';
          validatorArray = [CustomValidators.hardMaxLength(this.maxLength), CustomValidators.contact_number];
          break;
        case 'email':
          this._type = 'email';
          validatorArray = [CustomValidators.hardMaxLength(this.maxLength), CustomValidators.email];
          break;
        case 'number':
          this._type = 'number';
          validatorArray = [CustomValidators.hardMaxLength(this.maxLength), CustomValidators.numeric];
          break;
        case 'currency':
          this._type = 'currency';
          validatorArray = [CustomValidators.hardMaxLength(this.maxLength), CustomValidators.currency];
          break;
        case 'date':
          this._type = 'date';
          validatorArray = [
            // CustomValidators.hardMaxLength(this.maxLength),
            CustomValidators.isDate
          ];
          if (this.noFutureDate === true) {
            validatorArray.push(CustomValidators.noFutureDate);
          }
          break;
      }
      if (!checkNullUndefined(this.pattern)) {
        validatorArray.push(CustomValidators.pattern(RegExp(this.pattern)));
      }
      if (this.required === true) {
        validatorArray.push(Validators.required);
      }
      if (this.noEndingSpace === true) {
        validatorArray.push(CustomValidators.noEndingSpaces);
      }

      this._currentComposedValidator = Validators.compose(validatorArray);
    }
    return this._currentComposedValidator(c);
  }
  registerOnValidatorChange?(fn: () => void): void {
    this._onValidatorChange = fn;
  }
}
