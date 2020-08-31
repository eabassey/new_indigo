import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quickFilter'
})
export class QuickFilterPipe implements PipeTransform {
  transform(items: any[], field: string, term: string): any[] {
    if (!items) {
      return [];
    }
    if (!term) {
      return items;
    }
    term = term.toLowerCase();
    return items.filter(it => {
      return it[field].toLowerCase().includes(term);
    });
  }
}
