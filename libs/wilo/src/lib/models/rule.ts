export interface WhenRule {
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
  using: string; // Eg: http.get
  withArgs?: any[]
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
