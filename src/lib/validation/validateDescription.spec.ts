import validateDescription from './validateDescription';

describe('#validateDescription', () => {
  describe('#Errors', () => {
    it('should return error if input is empty and breaking change is true', () => {
      expect(validateDescription('', { isBreak: true })).toContain(
        'specify a description for breaking changes',
      );
    });

    it('should return error if input is not lowercase', () => {
      expect(
        validateDescription('LOREM ipsum dolor sit amet', {
          isBreak: false,
        }),
      ).toContain('value must be all lowercase');
    });
  });

  describe('#Success', () => {
    it('should return true if input is empty and breaking change is false', () => {
      expect(validateDescription('', { isBreak: false })).toBeTruthy();
    });

    it('should return true if input has value and breaking change is true', () => {
      expect(
        validateDescription('requires new user dependency', { isBreak: true }),
      ).toBeTruthy();
    });
  });
});
