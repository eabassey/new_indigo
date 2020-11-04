import { Injectable } from '@angular/core';
import { map, skipWhile, tap } from 'rxjs/operators';
import { ConditionalReturn } from './models';
import { RulesService } from './rules.service';


@Injectable({providedIn: 'root'})
export class ConditionalReturnService {
  constructor(private rulesService: RulesService) {}

  checkCondition(data: ConditionalReturn) {
    return this.rulesService.renderWhenRule(data.whenRule).pipe(
      map(positive => (positive ? data.thenReturn : data.elseReturn))
    );
  }
}
