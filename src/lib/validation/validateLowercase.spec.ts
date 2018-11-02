import validateLowercase from './validateLowercase';

describe('#validateLowercase', () => {
  it(`prevents commits if there's a capital letter`, () => {
    expect(validateLowercase('Test')).toEqual(
      'The value must be all lowercase',
    );
  });

  it('allows commits if the value is all lowercase', () => {
    expect(validateLowercase('a value all lowercase')).toBeTruthy();
  });
});
