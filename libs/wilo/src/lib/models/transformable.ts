export interface Transformable {
  parentPath?: string;
  parentMapper: { [key: string]: string };
  childMappers?: {path: string; mapper: {[id: string]: string}}[];
}
