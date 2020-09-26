import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jsonata from 'jsonata';


export const query = (queryStr: string) => (source: Observable<any>) => {
  return source.pipe(map(data => jsonata(queryStr).evaluate(data)));
};

// export const query = (queryStr: string) => (source: Observable<any>) => {
//   return source.pipe(map(data => jmespath.search(data, queryStr)));
// };
