import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "fsKeys"
})
export class ObjectKeysPipe implements PipeTransform {
  transform(value, args: string[]): any[] {
    const keys = Object.keys(value);
    return keys;
  }
}
