import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { returnOrDefault } from '@foursure-platform/shared';

export type KeyValueList = Array<KeyValueListItem | string>;

export interface KeyValueListItem {
  display: string[];
  value: string;
}

@Component({
  selector: 'er-key-value-list',
  templateUrl: './key-value-list.component.html',
  styleUrls: ['./key-value-list.component.scss']
})
export class ERKeyValueList implements OnInit {
  // ===========================================  Variables ===========================================================
  get trackByFunc() {
    return item => item.value;
  }

  listData$: Observable<Array<KeyValueListItem>>;
  // ---------------------------------------- Internal Variables ------------------------------------------
  private _disabled: boolean;
  // private __multi: boolean;
  // private _recalculate: boolean;
  // ============================================= Inputs =============================================================
  @Input()
  set disabled(disabled: boolean) {
    throw new Error(`This is a reactive control. Do not bind directly to the disabled state of this control.\
      rather disable it through the parent control  `);
  }
  get disabled() {
    return returnOrDefault(this._disabled, false);
  }

  // inclusive min
  // @Input() set multi(bMulti: boolean | string) {
  //   // coerce to boolean and then handle for not set
  //   this.__multi = !bMulti ? /^t|(true)$/gi.test(`${bMulti}`) : true;
  // }
  // get multi() {
  //   return returnOrDefault(this.__multi, false);
  // }

  @Input() set DataList$(DataList$: Observable<KeyValueList>) {
    this.listData$ = DataList$.pipe(
      // tap(console.log),
      map((arrayIn: KeyValueList) => {
        // a string will have a zero index an object will not
        if (arrayIn.length == 0) {
          return [];
        }
        return arrayIn[0]['display'] ? (arrayIn as Array<KeyValueListItem>) : ERKeyValueList.refactorArray(arrayIn);
      })
      // tap(console.log),
    );
  }
  // ============================================= Outputs ============================================================

  // ============================================= Methods ============================================================

  // ------------------------------------------ Static Methods --------------------------------------------------------
  private static refactorArray(arrayIn): Array<KeyValueListItem> {
    let arrayOut: Array<KeyValueListItem> = [];
    for (let entry of arrayIn) {
      arrayOut.push({ value: entry, display: [entry] });
    }
    return arrayOut;
  }
  // ------------------------------------------- Public Methods -------------------------------------------------------
  // selectItem(itemValue: string) {
  //   if (this.disabled === true) {
  //     return;
  //   }
  //   // check if item is already selected
  //   if (this.selectedItems.has(itemValue) === true) {
  //     // if so remove it
  //     this.selectedItems.delete(itemValue);
  //   } else {
  //     if (this.multi === false) {
  //       // change it out
  //       this.selectedItems.clear();
  //       this.selectedItems.add(itemValue);
  //     } else {
  //       // add it to the list
  //       this.selectedItems.add(itemValue);
  //     }
  //   }
  //   this.outputValue(this.selectedItems);

  //   this.touch(setToArray(this.selectedItems));
  // }

  // touch(items) {
  //   this.onTouched(items);
  // }

  // outputValue(selectedItems: Set<string>) {
  //   if (!this.onChange) {
  //     return;
  //   }
  //   this.onChange(setToArray(selectedItems));
  // }
  // ------------------------------------------ Internal Methods ------------------------------------------

  // ----------------------------------------- Life-cycle methods -----------------------------------------
  ngOnInit() {
    // if (!this.selectedItems) {
    //   this.selectedItems = new Set();
    // }
  }

  // ------------------------------------------ Control Value Accessor Methods ------------------------------------------
  // writeValue(value: Array<string>): void {
  //   this.selectedItems.clear();
  //   if (!!value && Array.isArray(value)) {
  //     for (const entry of value) {
  //       this.selectedItems.add(entry);
  //     }
  //   }
  // }

  // registerOnChange(fn: any): void {
  //   this.onChange = fn;
  // }

  // registerOnTouched(fn: any): void {
  //   this.onTouched = fn;
  // }

  // setDisabledState?(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }
}
