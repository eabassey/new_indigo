import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';

// import * as fromStore from '../store';

@Pipe({
  name: 'spSkillName',
  pure: false,
})
export class SpSkillNamePipe implements PipeTransform {
  transform(spSkillId: number, skills: any): string {
    if (skills.length > 0) {
      const current = skills.find((currentSkill) => currentSkill.id === spSkillId[0]);
      return current.name || 'NA';
    }
    return 'NA';
  }
}
