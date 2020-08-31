import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchfilter'
})
export class SearchFilterPipe implements PipeTransform {
    transform(items: any[], value: string): any[] {
        if (!items) {
            return [];
        }
        if (value) {
            return items.filter(
                item => item.full_name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1);
        }
        return items;
    }
}
