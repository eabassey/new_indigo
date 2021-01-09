import {
  Component,
  OnInit,
  forwardRef,
  ChangeDetectionStrategy,
  Input,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormControl } from '@angular/forms';
import { IControlValueAccessor } from '../../../../utilities/src/';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { skipWhile, filter } from 'rxjs/operators';

export interface SelectListOption {
  display: string;
  value: string;
}

@Component({
  selector: 'flx-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FLXSelectListComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXSelectListComponent implements OnInit, OnDestroy, AfterViewInit, IControlValueAccessor {
  public FilterForm!: FormGroup;
  public isCollapsed: boolean = false;
  public isDisabled: boolean = false;
  public displayList: BehaviorSubject<SelectListOption[]> = new BehaviorSubject<SelectListOption[]>([]);
  public isViewInitialised: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public filterSub!: Subscription | undefined;

  @Input()
  public heading!: string;

  @Input()
  public subheading!: string;

  private _selectedOptions: Set<string> = new Set();
  get selectedOptions() {
    return this._selectedOptions;
  }
  set selectedOptions(val) {
    this._selectedOptions = val;
    if (this.sendChanges) {
      this.sendChanges(Array.from(this._selectedOptions));
    }
  }

  private _canFilter = true;
  @Input() get canFilter(): boolean {
    return this._canFilter;
  }
  set canFilter(value: boolean) {
    this._canFilter = value;
  }

  private _isMultiSelect = false;
  @Input() get isMultiSelect(): boolean {
    return this._isMultiSelect;
  }
  set isMultiSelect(value: boolean) {
    if (value) {
      this._isMultiSelect = value;
    }
  }

  private _collapseOnSelect = true;
  @Input() get collapseOnSelect(): boolean {
    if (this._isMultiSelect) {
      return false;
    } else {
      return this._collapseOnSelect;
    }
  }
  set collapseOnSelect(value: boolean) {
    if (typeof value === 'boolean') {
      this._collapseOnSelect = value;
    }
  }

  private _height = '150px';
  @Input() get height(): string {
    return this._height;
  }
  set height(value: string) {
    if (value) {
      this._height = value;
    }
  }

  private _maxWidth = '100%';
  @Input() get maxWidth() {
    return this._maxWidth;
  }
  set maxWidth(width: string) {
    if (width) {
      this._maxWidth = width;
    }
  }

  @Input()
  public options!: SelectListOption[];

  @Input()
  public options$!: Observable<SelectListOption[]>;

  public sendChanges!: (_: any) => {};
  public touchChanges!: (_: any) => {};
  public validateFn!: (_: any) => {};

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.FilterForm = new FormGroup({
      searchField: new FormControl('')
    });

    this.isViewInitialised.subscribe(shouldInit => {
      if (shouldInit) {
        if (this.options$) {
          this.options$.pipe(skipWhile(res => !res && res === this.displayList.value)).subscribe(list => {
            this.options = list;
            this.updateDisplayList();
          });
        } else {
          this.updateDisplayList();
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.filterSub) {
      this.filterSub.unsubscribe();
    }
  }

  updateDisplayList() {
    if (this.canFilter) {
      this.FilterForm = new FormGroup({
        searchField: new FormControl('')
      });

      this.filterSub = this.FilterForm.get('searchField')?.valueChanges.subscribe(sf => {
        const filteredOptions = this.options.filter(item => item.display.toLowerCase().includes(sf.toLowerCase()));
        this.displayList.next(filteredOptions);
        this.changeDetector.detectChanges();
      });
    }

    this.displayList.next(this.options);
    this.changeDetector.detectChanges();

    if (this.selectedOptions.size === 1 && this.collapseOnSelect) {
      this.collapseAndScroll(this.selectedOptions.values().next().value);
    }
  }

  ngAfterViewInit() {
    this.isViewInitialised.next(true);
  }

  writeValue(value: any): void {
    if (value) {
      this.selectedOptions = new Set(value);
    }
  }

  registerOnChange(fn: any): void {
    this.sendChanges = fn;
  }

  registerOnTouched(fn: any): void {
    this.touchChanges = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  selectOption(option: any) {
    if (!this.isDisabled) {
      if (this.selectedOptions.has(option.value)) {
        this.selectedOptions.delete(option.value);
        this.selectedOptions = new Set(this.selectedOptions);
        this.isCollapsed = false;
      } else {
        if (this._isMultiSelect) {
          this.selectedOptions.add(option.value);
          this.selectedOptions = new Set(this.selectedOptions);
        } else {
          this.selectedOptions = new Set([option.value]);

          if (this.collapseOnSelect) {
            this.collapseAndScroll(option.value);
          } else if (!this.collapseOnSelect && this.canFilter) {
            this.FilterForm.get('searchField')?.patchValue('');
            this.collapseAndScroll(option.value);
          }
        }
      }
    }
  }

  public collapseAndScroll(sId: string) {
    this.isCollapsed = true;
    setTimeout(() => {
      const item = document.getElementById(sId);

      if (item) {
        item.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }, 100);
  }
}
