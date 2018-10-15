import os from 'os';

import { Answers } from 'inquirer';
import compact from 'lodash.compact';
import wrap from 'word-wrap';

const splitIssues = (issues?: string) => {
  if (!issues) {
    return [];
  }

  const isSpaceSeparated = issues.includes(' ');
  const separator = isSpaceSeparated ? ' ' : ',';

  return issues.split(separator);
};

export default function formatCommit(answers: Answers) {
  const wrapOptions = {
    indent: '',
    newline: '\n',
    trim: true,
    width: 80,
  };

  const {
    body,
    isIssueAffected,
    issues,
    scope,
    subject,
    type = 'feat',
  } = answers;

  // Hard limit this line
  const commitHeader = `${type}${
    scope ? `(${scope})` : ''
  }: ${subject.trim()}`.slice(0, wrapOptions.width);

  // Wrap these lines at 100 characters
  const commitBody = wrap(body, wrapOptions);

  // JIRA issues and workflow
  const formattedIssues = splitIssues(issues)
    .map((issue, index) => {
      // @TODO Make this better
      return index === 0 ? `Fixes ${issue}` : `fixes ${issue}`;
    })
    .join(', ');

  const commitFooter = isIssueAffected ? `${formattedIssues}` : '';

  const message = compact([commitHeader, commitBody, commitFooter]);

  return message.join(os.EOL + os.EOL);
}
