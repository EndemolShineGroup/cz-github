import os from 'os';

import { Answers } from 'inquirer';
import wrap from 'word-wrap';

import { splitIssues } from './util';

const wrapOptions = {
  indent: '',
  newline: '\n',
  trim: true,
  width: 80,
};

export default function formatCommit(answers: Answers) {
  const {
    body,
    isIssueAffected,
    issues,
    scope,
    subject,
    isBreakingChange,
    type = 'feat',
  } = answers;

  let messageArr: string[] = [];

  // header
  messageArr.push(getHeader(type, scope, subject));
  // body
  if (body !== '') {
    messageArr.push(getBody(body, isBreakingChange));
  }

  if (isIssueAffected) {
    messageArr.push(getFormattedIssues(issues));
  }

  return messageArr.join(os.EOL + os.EOL);
}

const getHeader = (type: string, scope: string, subject: string): string => {
  scope = scope === '' ? scope : `(${scope})`;
  // Hard limit this line
  return `${type}${scope}: ${subject.trim()}`.slice(0, wrapOptions.width);
};

const getBody = (body: string, isBreakingChange: boolean): string => {
  body = isBreakingChange ? `BREAKING CHANGE: ${body}` : body;
  // Wrap these lines at 100 characters
  return wrap(body, wrapOptions);
};

// GitHub issue IDs
const getFormattedIssues = (issues: string) => {
  return splitIssues(issues)
    .map((issue, index) => {
      return `${index === 0 ? 'Fixes' : 'fixes'} ${issue}`;
    })
    .join(', ');
};
