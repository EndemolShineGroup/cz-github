import isIssueAffected from './isIssueAffected';

describe('#isIssueAffected', () => {
  it('returns true if isIssueAffected=true', () => {
    expect(isIssueAffected({ isIssueAffected: true })).toBeTruthy();
  });

  it('returns false if isIssueAffected=false', () => {
    expect(isIssueAffected({ isIssueAffected: false })).toBeFalsy();
  });
});
