import fs from 'fs';
import os from 'os';
import path from 'path';

import get from 'lodash.get';
import map from 'lodash.map';
import max from 'lodash.max';
import padEnd from 'lodash.padend';

import {
  CommitizenConfig,
  ConventionalCommitTypes,
  PackageJson,
} from './types';

const conventionalCommitTypes: ConventionalCommitTypes = require('conventional-commit-types');

export function addEOL(message: string) {
  return `${message}${os.EOL}`;
}

export function findLongest(strings: string[]): number {
  return (
    max(
      map(strings, (key) => {
        return key.length;
      }),
    ) || 0
  );
}

export function formatGitBranchName(branchName: string) {
  return (branchName || '')
    .replace('feature/', '') // Get rid of `feature/` prefix
    .replace('fix/', '') // Get rid of `fix/` prefix
    .toLocaleUpperCase(); // Uppercase issue IDs
}

// Look for `.czrc` and require it
export function loadConfig(
  projectPath: string = process.cwd(),
): CommitizenConfig {
  const configPath = path.join(projectPath, '.czrc');
  const file = fs.readFileSync(configPath);
  return JSON.parse(file.toString('utf8'));
}

export function createCommitTypeChoices() {
  const keys = Object.keys(conventionalCommitTypes.types);
  const choicesMaxLength = findLongest(keys) + 1;
  return map(conventionalCommitTypes.types, function(type, key) {
    return {
      name: padEnd(key + ':', choicesMaxLength) + ' ' + type.description,
      value: key,
    };
  });
}

export function createScopeChoices(config: CommitizenConfig, pkg: PackageJson) {
  const userDefinedScopes = get(config[pkg.name], `scopes`, {});
  const scopeChoicesMaxLength = findLongest(Object.keys(userDefinedScopes)) + 1;
  return map(userDefinedScopes, function(description, scope) {
    return {
      name: padEnd(scope + ':', scopeChoicesMaxLength) + ' ' + description,
      value: scope,
    };
  });
}
