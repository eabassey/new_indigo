import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
// import {
//   getServerSearchResult,
//   getFilters,
//   SetFilterDataField,
//   SetFilterSet,
//   ResetServerSearch,
//   getFilterData
// } from '@indigo/ui-composites/src';
// import { BigFormService, getAllInfo } from '@indigo/engine/src';
import { map, take, skipWhile, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'flx-search-banner',
  templateUrl: 'search-banner.component.html',
  styleUrls: ['./search-banner.component.scss']
})
export class FLXSearchBannerComponent implements OnInit, OnDestroy {
  // ============================== private vars ==============================
  private _searchResultSubscription: Subscription;
  private _filterSubscription: Subscription;

  // ============================== public vars ==============================
  public hasSearchValues = false;
  public searchData: { inSearch: string; filters: any[] } = { inSearch: '', filters: [] };

  // ============================== constructor ==============================
  constructor(private _store: Store<any>,
    // private _bf: BigFormService,
     private _cdr: ChangeDetectorRef) {}

  // ============================== life-cycle functions ==============================
  ngOnInit() {
    // this._searchResultSubscription = this._store
    //   .select(getServerSearchResult)
    //   .pipe(withLatestFrom(this._store.select(getFilterData)))
    //   .subscribe(([res, searchData]) => {
    //     if (this._bf.bigForm.get('search') || !!searchData.searchField) {
    //       this.searchData.inSearch =
    //         (this._bf.bigForm.contains('inSearch') && this._bf.bigForm.get('search')
    //           ? this._bf.bigForm.get('search').value.inSearch
    //           : '') ||
    //         (searchData.searchField && searchData.searchField.inSearch ? searchData.searchField.inSearch : '');
    //       this.hasSearchValues = this._hasSearched();
    //       this._cdr.detectChanges();
    //     }
    //   });

    // this._filterSubscription = this._store
    //   .select(getFilters)
    //   .pipe(
    //     withLatestFrom(
    //       this._store.select(getAllInfo).pipe(
    //         skipWhile(x => !x['states']),
    //         take(1)
    //       )
    //     ),
    //     map(([filters, allInfo]) =>
    //       filters.map(filterItem => {
    //         if (filterItem.allInfoName) {
    //           const filteredCategory = allInfo[filterItem.allInfoName];
    //           if (filteredCategory) {
    //             const filteredArr = filteredCategory.filter(categoryItem =>
    //               filterItem.filterValue[0].includes(categoryItem.id)
    //             );
    //             if (filteredArr && filteredArr.length !== 0) {
    //               return {
    //                 filterName: filterItem.filterName,
    //                 filterValue:
    //                   filteredArr[0].description !== undefined
    //                     ? filteredArr[0].description
    //                     : filteredArr[0].name !== undefined
    //                     ? filteredArr[0].name
    //                     : ''
    //               };
    //             }
    //           }
    //         }
    //         return filterItem;
    //       })
    //     )
    //   )
    //   .subscribe(filters => {
    //     this.searchData.filters = filters;
    //     this.hasSearchValues = this._hasSearched();
    //     this._cdr.detectChanges();
    //   });
  }

  ngOnDestroy() {
    if (this._searchResultSubscription) this._searchResultSubscription.unsubscribe();
    if (this._filterSubscription) this._filterSubscription.unsubscribe();
  }

  // ============================== private functions ==============================
  private _hasSearched() {
    if (
      this.searchData &&
      (this.searchData.inSearch !== '' || (this.searchData.filters && this.searchData.filters.length > 0))
    )
      return true;
    return false;
  }

  // ============================== public functions ==============================
  public clearSearch() {
    // this._store.dispatch(new SetFilterDataField({ key: 'filters', data: {} }));
    // this._store.dispatch(new SetFilterSet({ filterSet: [] }));
    // this._store.dispatch(new SetFilterDataField({ key: 'source', data: 'none' }));
    // this._store.dispatch(new SetFilterDataField({ key: 'searchField', data: {} }));
    // if (this._bf.bigForm.get('search')) this._bf.bigForm.get('search').setValue({ checkClosed: false, inSearch: '' });
    // this._store.dispatch(new ResetServerSearch());
    // this.searchData.inSearch = '';
    // this.hasSearchValues = false;
  }
}
