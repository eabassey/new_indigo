import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { query, renderString, transformToShape } from '../rxjs-operators';


@Injectable({providedIn: 'root'})
export class StoreQuery {
  //

  constructor(private store: Store<any>) {}

  query(queryStr: string) {
    return this.store.pipe(
      query(queryStr)
    );
  }

  renderTemplate(templateStr: string, queryProps: {[key: string]: string}) {
    return this.store.pipe(
      renderString(templateStr, queryProps)
    );
  }

  transformToShape(mapper: {[key: string]: any}) {
    return this.store.pipe(
      transformToShape(mapper)
    );
  }

}
