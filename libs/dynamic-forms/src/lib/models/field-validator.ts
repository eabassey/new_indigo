export type FieldValidator = Required | MinLength;

interface Required { type: 'required'; errorMessage?: string;}
interface MinLength {type: 'minlength'; arg: number; errorMessage?: string;}
