import { FieldValidator } from './field-validator';

export interface Field {
    // id?: string;
    type: 'text' | 'email' | 'textarea' | 'date' | 'dropdown' | 'checkbox' | 'radio';
    name: string;
    label?: string;
    value?: any;
    disabled?: boolean;
    hidden?: boolean;
    controlClasses?: string;
    controlGroupClasses?: string;
    labelClasses?: string;
    options?: {key: string, label: string}[];
    placeholder?: string;
    validators?: FieldValidator[];
    hiddenWhen?: {
      field: string;
      operator: 'is' | 'equals' | 'contains';
      value: 'valid' | 'invalid' | string | true | false;
    }[];
    disableWhen?: {
      field: string;
      operator: 'is' | 'equals' | 'contains';
      value: 'valid' | 'invalid' | string | true | false;
    }[];
  }
