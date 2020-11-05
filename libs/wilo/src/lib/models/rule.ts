export type ActionRule = WhenRule | DoRule;

export interface WhenRule {
  type: 'when',
  predicates: PredicateCondition[];
  doRules?: DoRule[];
}

export interface PredicateCondition {
  using: string; //eg: bf.bigForm.value.test
  withArgs?: any[];
  isFunc?: boolean;
  resultQuery?: string;
  operator: PredicateOperator
  valueComparer: any;
}

export interface DoRule {
  type: 'do';
  using: string; // Eg: http.get
  withArgs?: any[]
}

export type ReturnRule = SingleReturnRule | ConditionalReturnRule;

export interface SingleReturnRule {
  type: 'single_return';
  isFunc?: boolean;
  using: string; // Eg: http.get
  withArgs?: any[];
  resultQuery?: string;
}


export interface ConditionalReturnRule {
  type: 'conditional_return'
  whenRule: WhenRule;
  thenReturn: any;
  elseReturn?: any;
}


export type PredicateOperator =
'equals' |
'greaterThan' |
'greaterThanOrEquals' |
'lessThan' |
'lessThanOrEquals' |
'contains' |
'containsAny' |
'hasLength' |



//
'not.equals' |
'not.greaterThan' |
'not.greaterThanOrEquals' |
'not.lessThan' |
'not.lessThanOrEquals' |
'not.contains';
