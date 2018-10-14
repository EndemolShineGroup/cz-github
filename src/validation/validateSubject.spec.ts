import validateSubject from './validateSubject';

describe('#validateSubject', () => {
  it('prevents commits if no subject specified', () => {
    expect(validateSubject()).toContain('specify subject');
  });

  it('prevents commits if subject is greater than 70 characters', () => {
    expect(
      validateSubject(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
      ),
    ).toContain('Subject should be 72 characters or less');
  });

  it('allows commits if subject passes all conditions', () => {
    expect(
      validateSubject(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
      ),
    ).toBeTruthy();
  });
});
