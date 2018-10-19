import validateSubject from './validateSubject';

describe('#validateSubject', () => {
  it('prevents commits if no subject specified', () => {
    expect(
      validateSubject('', { type: 'feat', scope: 'a custom scope' }),
    ).toContain('specify subject');
  });

  it('prevents commits if subject is greater than 70 characters', () => {
    expect(
      validateSubject(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
        { type: 'feat', scope: 'a custom scope' },
      ),
    ).toContain('characters or less');
  });

  it('allows commits if subject passes all conditions', () => {
    expect(
      validateSubject(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        { type: 'feat', scope: 'a custom scope' },
      ),
    ).toBeTruthy();
  });
});
