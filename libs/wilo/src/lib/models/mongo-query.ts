

export interface MongoQuery {
  collectionPath?: string;
  criteria: string;
  projection?: string;
  skip?: number;
  limit?: number;
  sort?: string;
  return?: 'all' | 'count'
}
