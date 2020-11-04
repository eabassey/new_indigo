import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { TemplateParser } from '../models/template-parser';
import { StoreQuery } from './store-query.service';



@Injectable({providedIn: 'root'})
export class TemplateParserService {
  constructor(private storeQuery: StoreQuery) {}

  parse(data: TemplateParser) {
    if (data.queries) {
      return this.storeQuery.renderTemplate(data.template, data.queries);
    }
    return of(data.template);
  }
}
