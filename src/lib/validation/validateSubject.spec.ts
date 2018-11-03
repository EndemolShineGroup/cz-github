import validateSubject from './validateSubject';

describe('#validateSubject', () => {
  it('prevents commits if no subject specified', () => {
    expect(
      validateSubject('', { type: 'feat', scope: 'a custom scope' }),
    ).toContain('specify subject');
  });

  it('prevents commits if first word of subject is not lowercase', () => {
    expect(
      validateSubject('LOREM ipsum dolor sit amet', {
        scope: 'a custom scope',
        type: 'feat',
      }),
    ).toContain('first word must be lowercase');
  });

  it('prevents commits if header is greater than 100 characters', () => {
    expect(
      validateSubject(
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
        { type: 'feat', scope: 'a custom scope' },
      ),
    ).toContain('characters or less');
  });

  it('allows commits if subject passes all conditions', () => {
    expect(
      validateSubject(
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
        { type: 'feat', scope: 'a custom scope' },
      ),
    ).toBeTruthy();
  });
});
