import gitBranch from 'git-branch';
import { Questions } from 'inquirer';
import has from 'lodash.has';

import isIssueAffected from './conditions/isIssueAffected';
import { CommitizenConfig, PackageJson } from './types';
import {
  addEOL,
  createCommitTypeChoices,
  createScopeChoices,
  formatGitBranchName,
} from './util';
import validateIssues from './validation/validateIssues';
import validateSubject from './validation/validateSubject';

interface CreatePrompts {
  config: CommitizenConfig;
  pkg: PackageJson;
}

export default ({ config, pkg }: CreatePrompts): Questions => {
  const hasUserDefinedScopes = has(config, `${pkg.name}.scopes`);

  return [
    {
      choices: createCommitTypeChoices(),
      message: `Select the type of change that you're committing:`,
      name: 'type',
      type: 'list',
    },
    {
      choices: hasUserDefinedScopes
        ? createScopeChoices(config, pkg)
        : undefined,
      message:
        'What is the scope of this change (e.g. component)? (press enter to skip)',
      name: 'scope',
      type: hasUserDefinedScopes ? 'list' : 'input',
    },
    {
      message: 'Write a short, imperative tense description of the change:',
      name: 'subject',
      type: 'input',
      validate: validateSubject,
    },
    {
      message:
        'Provide a longer description of the change: (press enter to skip)',
      name: 'body',
      type: 'input',
    },
    {
      default: false,
      message: 'Does this change affect any open issues?',
      name: 'isIssueAffected',
      type: 'confirm',
    },
    {
      default: formatGitBranchName(gitBranch.sync()),
      message:
        'GitHub Issue/PR ID(s) (comma/space separated, default is branch name, e.g. #1 #2)',
      name: 'issues',
      type: 'input',
      validate: validateIssues,
      when: isIssueAffected,
    },
  ].map((question) => {
    return {
      ...question,
      message: addEOL(question.message),
    };
  });
};
