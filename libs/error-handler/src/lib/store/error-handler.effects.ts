import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AddError, RemoveError } from './error-handler.actions';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  addError$ = this.actions$.pipe(
    filter(action => action.type.toUpperCase().endsWith('FAIL')),
    map((action: any) => {
      return new AddError(action.payload);
    })
  );

  @Effect()
  removeError$ = this.actions$.pipe(
    filter((action: any) => action.type.toUpperCase().endsWith('SUCCESS')),
    map((action: any) => {
      return new RemoveError({
        dataKey: (action.payload && action.payload.dataKey) || null
      });
    })
  );
}
