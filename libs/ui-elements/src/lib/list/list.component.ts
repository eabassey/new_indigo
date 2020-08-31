import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ParentAtom } from '../parents/parent-atom-component/parent-atom.component';

export enum FLXListAtomHeadingType {
  'none' = 'none',
  'row-headings' = 'row-headings',
  'column-headings' = 'column-headings',
  'column-and-row-headings' = 'column-and-row-headings',
}

export type ListAtomData = Array<Array<string>>;
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'flx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FLXListAtom extends ParentAtom {
  // ---------------------------------------- Internal Variables ------------------------------------------

  // ============================================= Inputs =============================================================
  private readonly defaultHeadingType = FLXListAtomHeadingType.none;
  @Input() headingType: FLXListAtomHeadingType = this.defaultHeadingType;
  @Input() ItemList: ListAtomData;
  get columnHeadingClasses() {
    switch (this.headingType) {
      case FLXListAtomHeadingType['row-headings']:
      case FLXListAtomHeadingType['none']: {
        return {
          bold: false,
        };
      }
      case FLXListAtomHeadingType['column-headings']:
      case FLXListAtomHeadingType['column-and-row-headings']: {
        return {
          bold: true,
        };
      }
    }
  }
  get rowHeadingClasses() {
    switch (this.headingType) {
      case FLXListAtomHeadingType['column-headings']:
      case FLXListAtomHeadingType['none']: {
        return {
          bold: false,
        };
      }
      case FLXListAtomHeadingType['column-and-row-headings']:
      case FLXListAtomHeadingType['row-headings']: {
        return {
          bold: true,
        };
      }
    }
  }

  // ----------------------------------------- Life-cycle methods -----------------------------------------
}
