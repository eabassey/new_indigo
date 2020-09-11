export type FieldValidator = Required | MinLength;

interface Required { type: 'required'; errorMessage?: string;}
interface MinLength {type: 'minLength'; arg: number; errorMessage?: string;}
