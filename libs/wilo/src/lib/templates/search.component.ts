import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CoreServices } from '../services';


@Component({
  selector: 'search',
  template:`
   <flx-flex-container>
  <flx-heading type="page" size="medium">Search</flx-heading>
  <form [formGroup]="svc.bf.bigForm">
    <input type="text" formControlName="search"/>
    <!-- <flx-search-bar formControlName="search" (clear)="clearSearch()" (doSearch)="doSearch()"></flx-search-bar> -->
  </form>
</flx-flex-container>

  `,
  styles: [`
  :host {
      width: 100%;
    }

    .heading {
      height: 56px;
      display: flex;
      justify-items: center;
      line-height: 56px;
    }

  `]
})
export class SearchComponent implements OnInit {
  constructor(public svc: CoreServices) {}

  ngOnInit() {
    this.svc.bf.addControl('search', new FormControl({ search: '' }));
    this.svc.bf.addControl('checkClosed', new FormControl({ checkClosed: false }));
  }

  doSearch() {

  }

  clearSearch() {}
}
