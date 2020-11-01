import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jsonata from 'jsonata';


export const query = (queryStr: string) => (source: Observable<any>) => {
  return queryStr ? source.pipe(map(data => jsonata(queryStr).evaluate(data))) : source;
};

export const queryValue = (queryStr: string, data: any) => {
  return jsonata(queryStr).evaluate(data);
}

// export const query = (queryStr: string) => (source: Observable<any>) => {
//   return source.pipe(map(data => jmespath.search(data, queryStr)));
// };
