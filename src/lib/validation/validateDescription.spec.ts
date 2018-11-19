import validateDescription from './validateDescription';

describe('#validateDescription', () => {
  it('should return error if input is empty and breaking change is true', () => {
    expect(validateDescription('', { isBreakingChange: true })).toContain(
      'specify a description for breaking changes',
    );
  });

  it('should return error if input is not lowercase', () => {
    expect(
      validateDescription('LOREM ipsum dolor sit amet', {
        isBreakingChange: false,
      }),
    ).toContain('value must be all lowercase');
  });

  it('should return true if input is empty and breaking change is false', () => {
    expect(validateDescription('', { isBreakingChange: false })).toBeTruthy();
  });

  it('should return true if input has value and breaking change is true', () => {
    expect(
      validateDescription('requires new user dependency', {
        isBreakingChange: true,
      }),
    ).toBeTruthy();
  });
});
