import jmespath from 'jmespath';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {compile} from 'handlebars';

export const renderTemplate = (templateStr: string, queryProps: {[key: string]: string}) => (source: Observable<any>) => {
  return source.pipe(
    map(state => {
      const queryResult = Object.entries(queryProps).reduce((acc, [prop, query]) => {
        return {
          ...acc,
          [prop]: jmespath.search(state, query)
        };
      }, {});
      const template = compile(templateStr);
      return template(queryResult);
    })
  )
};
