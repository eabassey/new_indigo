import jmespath from 'jmespath';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import render from 'json-templater/object';

export const renderJson = (jsonStr: string, queryProps: {[key: string]: string}) => (source: Observable<any>) => {
  return source.pipe(
    map(state => {
      const queryResult = Object.entries(queryProps).reduce((acc, [prop, query]) => {
        return {
          ...acc,
          [prop]: jmespath.search(state, query)
        };
      }, {});
      return render(jsonStr, queryResult);
    })
  );
};
