import * as util from '../index';
describe('dynamic footer workaround', () => {
  it('checks for booleans', () => {
    expect(true).toBe(true);
  });
});

describe('checking that the CheckallKeysProvidedExistInObject function works ', () => {
  // there is a hell of a lot of setup to save time im just copying out my logging and checking from stack blitz to this file
  let results = {
    equal: util.CheckAllKeysProviedExistInObject({ string: '', boolean: true, nully: null }, ['string', 'boolean', 'nully']),
    'key missing in object': util.CheckAllKeysProviedExistInObject({ string: '', nully: null }, ['string', 'boolean', 'nully']),
    'extra key in object': util.CheckAllKeysProviedExistInObject({ string: '', boolean: true, nully: null, function: () => { } }, [
      'string',
      'boolean',
      'nully',
    ]),
    'undefined key': util.CheckAllKeysProviedExistInObject({ string: '', boolean: true, nully: null, function: undefined }, [
      'string',
      'boolean',
      'nully',
      'function',
    ]),

    'extra key in object and strict key checks': util.CheckAllKeysProviedExistInObject(
      { string: '', boolean: true, nully: null },
      ['string', 'boolean'],
      true,
    ),
    'key in object is null and checks are strict': util.CheckAllKeysProviedExistInObject(
      { string: '', boolean: true, nully: null },
      ['string', 'boolean', 'nully'],
      false,
      true,
    ),
  };

  it('equal', () => {
    expect(results['equal']).toBe(true);
  });
  it('undefined key', () => {
    expect(results['undefined key']).toBe(false);
  });
  it('key missing in object', () => {
    expect(results['key missing in object']).toBe(false);
  });
  it('extra key in object', () => {
    expect(results['extra key in object']).toBe(true);
  });
  it('extra key in object and strict key checks', () => {
    expect(results['extra key in object and strict key checks']).toBe(false);
  });
  it('key in object is null and checks are strict', () => {
    expect(results['key in object is null and checks are strict']).toBe(false);
  });
});
