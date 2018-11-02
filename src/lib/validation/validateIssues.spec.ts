import validateIssues from './validateIssues';

describe('#validateIssues', () => {
  it('prevents commits if no issue IDs specified', () => {
    expect(validateIssues()).toContain('specify at least one issue ID');
  });

  it('prevents commits with invalid issue IDs', () => {
    expect(validateIssues('1')).toContain('must be prefixed by #');
  });

  it('prevents commits to the master and develop branches', () => {
    expect(validateIssues('DEVELOP')).toContain('should not commit directly');
    expect(validateIssues('MASTER')).toContain('should not commit directly');
  });

  it('allows commits with a single issue ID', () => {
    expect(validateIssues('#15')).toBeTruthy();
  });

  it('allows commits with a multiple issue IDs, comma-separated', () => {
    expect(validateIssues('#108,#22,#311')).toBeTruthy();
  });

  it('allows commits with a multiple issue IDs, space-separated', () => {
    expect(validateIssues('#1123 #2 #45')).toBeTruthy();
  });
});
