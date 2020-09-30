import * as jsonata from 'jsonata';


export const runQuery = (query: string, data: any) => {
    const expression = jsonata(query);
    const result = expression.evaluate(data);
    return result;
  };