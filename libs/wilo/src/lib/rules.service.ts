import { Injectable } from "@angular/core";
import { CoreServices } from './services';
import {path, split} from 'ramda';
import { combineLatest, EMPTY, from, isObservable, Observable, of } from 'rxjs';
import { combineAll, map, skipWhile, tap } from 'rxjs/operators';
import { ConditionalReturnRule, DoRule, ReturnRule, PredicateCondition, PredicateOperator, SingleReturnRule, WhenRule, ActionRule } from './models/rule';
import { query, queryValue } from './rxjs-operators';
import isPromise from 'is-promise';
import {contains, any, intersection} from 'ramda';





@Injectable({providedIn: 'root'})
export class RulesService {
  constructor(private svc: CoreServices) {}

  renderDoRule(rule: DoRule, ...args: any[]) {
    const splitted = split('.', rule.using);
    const value = path(splitted, this.svc);
    if (value) {
      if (rule.withArgs) {
        value.call(this.indexingForTHISContext(splitted, this.svc), ...args, ...rule.withArgs);
      } else {
        value.call(this.indexingForTHISContext(splitted, this.svc), ...args);
      }
    }
  }

  private renderSimpleReturnRule<T>(rule: SingleReturnRule): Observable<T> {
    const splitted = split('.', rule.using);
    const value = path(splitted, this.svc);
    const resultQuery = rule.resultQuery || '';
    if (rule.isFunc) {
      if (value) {
        if (rule.withArgs) {
         const result = value.call(this.indexingForTHISContext(splitted, this.svc),...rule.withArgs);
         switch (true) {
           case isObservable(result): {
             return result.pipe(query(resultQuery)) as Observable<T>;
           }
           case isPromise(result): {
             return from(result).pipe(query(resultQuery)) as Observable<T>
           }
           default: {
             return of(result).pipe(query(resultQuery)) as Observable<T>;
           }
         }
        } else {
          const result = value.call(this.indexingForTHISContext(splitted, this.svc));
          switch (true) {
            case isObservable(result): {
              return result.pipe(query(resultQuery)) as Observable<T>
            }
            case isPromise(result): {
              return from(result).pipe(query(resultQuery)) as Observable<T>
            }
            default: {
              return of(result).pipe(query(resultQuery)) as Observable<T>;
            }
          }
        }
      }
    } else {
      return value
    }
  }

  private renderConditionalReturnRule<T>(data: ConditionalReturnRule<T>) {
    return this.renderWhenRule(data.whenRule).pipe(
      map(positive => (positive ? data.thenReturn : data.elseReturn))
    );
  }

  renderReturnRule<T>(rule: ReturnRule<T>): Observable<T> {
    switch (rule.type) {
      case 'single_return': {
        return this.renderSimpleReturnRule(rule);
      }
      case 'conditional_return': {
        return this.renderConditionalReturnRule<T>(rule);
      }
    }
  }

  renderActionRule(rule: ActionRule, ...args: any[]) {
    switch (rule.type) {
      case 'do': {
        this.renderDoRule(rule, ...args);
        break;
      }
      case 'when': {
        this.renderWhenRule(rule, ...args);
        break;
      }
    }
  }

  renderWhenRule(rule: WhenRule, ...args: any[]) {
    return this.runAllPredicates(rule.predicates).pipe(
      tap(canRun => {
        if (canRun) {
          if (rule.doRules)
          rule.doRules.forEach(doRule => this.renderDoRule(doRule, ...args));
        }
      })
    );
  }

  indexingForTHISContext(splitted: string[], svc: CoreServices) {
    switch (splitted.length) {
      case 2: {
        return svc[splitted[0]];
      }
      case 3: {
        return svc[splitted[0]][splitted[1]];
      }
      case 4: {
        return svc[splitted[0]][splitted[1]][splitted[2]];
      }
    }
  }

  runPredicate(predicate: PredicateCondition) {
    const splitted = split('.', predicate.using);
    const value = path(splitted, this.svc);
    let result;
    if (predicate.isFunc) {
      result = predicate.withArgs ? value.call(this.indexingForTHISContext(splitted, this.svc),...predicate.withArgs) : value.call(this.indexingForTHISContext(splitted, this.svc));
    } else {
      result = value;
    }
    switch (true) {
      case isObservable(result): {
        return result.pipe(query(predicate.resultQuery), skipWhile(x => !x), map(res => this.handleOperator(predicate.operator, res, predicate.valueComparer)));
      }
      case isPromise(result): {
        return from(result).pipe(query(predicate.resultQuery), map(res => this.handleOperator(predicate.operator, res, predicate.valueComparer)));
      }
      default: {
        return predicate.resultQuery ? of(this.handleOperator(predicate.operator, queryValue(predicate.resultQuery, result), predicate.valueComparer)) : of(this.handleOperator(predicate.operator, result, predicate.valueComparer));
      }
    }
  }

  runAllPredicates(predicates: PredicateCondition[]) {
    const result = predicates.map(predicate => this.runPredicate(predicate))
    return combineLatest(result).pipe(map(res => res.every(val => val === true)))
  }

  handleOperator(op: PredicateOperator, inValue: any, valueComparer: any) {
    switch (op) {
      case 'equals': {
        return inValue === valueComparer;
      }
      case 'greaterThan': {
        return inValue > valueComparer;
      }
      case 'greaterThanOrEquals': {
        return inValue >= valueComparer;
      }
      case 'lessThan': {
        return inValue < valueComparer;
      }
      case 'lessThanOrEquals': {
        return inValue <= valueComparer;
      }
      case 'contains': {
        return contains(valueComparer, inValue);
      }
      case 'containsAny': {
        // return (inValue as any[]).some(contains(valueComparer));
        // return any(contains(valueComparer))(inValue);
        return intersection(inValue, valueComparer)?.length > 0;
      }
      case 'hasLength': {
        return inValue.length === valueComparer;
      }

    }
  }


}
