import os from 'os';

import formatCommit from './formatCommit';

import {
  body,
  formattedBody,
  isIssueAffected,
  issues,
  scope,
  subject,
  type,
} from './__fixtures__/commitAnswers';

describe('#formatCommit', () => {
  it('should be a function', () => {
    expect(typeof formatCommit).toEqual('function');
  });

  it('should perform a full commit', () => {
    const message = [
      'build(api): This took waaaaay too long',
      formattedBody,
      'Fixes #11, fixes #65, fixes #3168',
    ].join(os.EOL + os.EOL);
    const result = formatCommit({
      body,
      isIssueAffected,
      issues,
      scope,
      subject,
      type,
    });
    expect(result).toEqual(message);
  });

  it('should commit without any issue IDs', () => {
    const message = ['build: This took waaaaay too long', formattedBody].join(
      os.EOL + os.EOL,
    );
    const result = formatCommit({ type, subject, body });
    expect(result).toEqual(message);
  });

  it('should commit without a scope', () => {
    const message = [
      'build: This took waaaaay too long',
      formattedBody,
      'Fixes #11, fixes #65, fixes #3168',
    ].join(os.EOL + os.EOL);
    const result = formatCommit({ issues, type, subject, body });
    expect(result).toEqual(message);
  });

  it('should commit without a body', () => {
    const message = [
      'build: This took waaaaay too long',
      'Fixes #11, fixes #65, fixes #3168',
    ].join(os.EOL + os.EOL);
    const result = formatCommit({ issues, type, subject });
    expect(result).toEqual(message);
  });

  it('should use the defaults if type and/or workflow are not defined', () => {
    const result = formatCommit({ issues, subject });
    const message = [
      'feat: This took waaaaay too long',
      'Fixes #11, fixes #65, fixes #3168',
    ].join(os.EOL + os.EOL);
    expect(result).toEqual(message);
  });
});
