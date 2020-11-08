import { Injectable } from "@angular/core";
import * as jsonata from 'jsonata';
import mingo from 'mingo';
import {path, split} from 'ramda';
import { MongoQuery } from '../models/mongo-query';

@Injectable({providedIn: 'root'})
export class DataQueryService {

  useMongoQuery(data: any, query: MongoQuery) {
    const criteria = JSON.parse(query.criteria);
    const projection = query.projection ? JSON.parse(query.projection) : {};
    const collection = query.collectionPath ? path(split('.', query.collectionPath), data) :  data;
    const cursor = mingo.find(collection, criteria, projection);

    let cursorHolder = cursor;
    if (query.skip) {
      cursorHolder = cursorHolder.skip(query.skip);
    }
    if (query.limit) {
      cursorHolder = cursorHolder.limit(query.limit);
    }
    if (query.sort) {
      const modifier = JSON.parse(query.sort);
      cursorHolder = cursorHolder.sort(modifier);
    }
    //
    switch (query.return) {
      case 'count': {
        return cursorHolder.count();
      }
      case 'all': {
        return cursorHolder.all();
      }
      default: {
        return cursorHolder.all();
      }
    }
  }

  useJsonata(data: any, queryStr: string) {
   return jsonata(queryStr).evaluate(data);
  }
}
