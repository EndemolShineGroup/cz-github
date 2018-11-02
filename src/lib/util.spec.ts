import os from 'os';
import path from 'path';

import {
  addEOL,
  createCommitTypeChoices,
  createScopeChoices,
  findLongest,
  formatGitBranchName,
  loadConfig,
  splitIssues,
} from './util';

describe('#addEOL', () => {
  it('adds an end of line character to a string', () => {
    const result = addEOL('hello');
    expect(result).toContain(os.EOL);
  });
});

describe('#findLongest', () => {
  it('removes any prefixes from a branch name', () => {
    const result = findLongest(['h', 'asd', 'asdadadsa', 'asdda']);
    expect(result).toEqual(9);
  });

  describe('#findLongest', () => {
    it('returns 0 if no strings are provided', () => {
      const result = findLongest([]);
      expect(result).toEqual(0);
    });
  });
});

describe('#loadConfig', () => {
  it('loads a Commitizen config file from the current working directory', () => {
    process.chdir(path.join(__dirname, '..', '..'));
    const result = loadConfig();
    expect(result).toEqual({
      path: './dist/index.js',
    });
  });

  it('loads a Commitizen config file from a given path', () => {
    const result = loadConfig(path.join(__dirname, '..', '..'));
    expect(result).toEqual({
      path: './dist/index.js',
    });
  });
});

describe('#formatGitBranchName', () => {
  it('removes any prefixes from a branch name', () => {
    expect(formatGitBranchName('feature/123')).toEqual('#123');
    expect(formatGitBranchName('feat/123')).toEqual('#123');
    expect(formatGitBranchName('hotfix/456')).toEqual('#456');
    expect(formatGitBranchName('fix/456')).toEqual('#456');
  });

  it('handles running on Travis CI when Git is not initialised', () => {
    const result = formatGitBranchName((null as unknown) as string);
    expect(result).toEqual('');
  });
});

describe('#createCommitTypeChoices', () => {
  it('removes any prefixes from a branch name', () => {
    const result = createCommitTypeChoices();
    expect(result).toHaveLength(11);
  });
});

describe('#createScopeChoices', () => {
  it('removes any prefixes from a branch name', () => {
    const config = {
      '@endemolshinegroup/cz-github': {
        scopes: {
          bar: 'A bar scope',
          foo: 'A foo scope',
        },
      },
      path: '@endemolshinegroup/cz-github',
    };
    const pkg = {
      name: '@endemolshinegroup/cz-github',
    };
    const result = createScopeChoices(config, pkg);
    expect(result).toHaveLength(2);
  });
});

describe('#splitIssues', () => {
  it('returns an empty array if no issues are provided', () => {
    const result = splitIssues();
    expect(result).toHaveLength(0);
  });

  it('splits comma-separated issues', () => {
    const result = splitIssues('#1,#2,#3');
    expect(result).toHaveLength(3);
  });

  it('splits space-separated issues', () => {
    const result = splitIssues('#1 #2 #3');
    expect(result).toHaveLength(3);
  });
});
