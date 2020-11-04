import { WhenRule } from './rule';

export interface ConditionalReturn {
  whenRule: WhenRule;
  thenReturn: any;
  elseReturn?: any;
}
