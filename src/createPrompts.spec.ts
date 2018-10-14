import { Question } from 'inquirer';
import find from 'lodash.find';

import createPrompts from './createPrompts';
import { CommitizenConfig, PackageJson } from './types';

describe('#createPrompts', () => {
  let config: CommitizenConfig;
  let pkg: PackageJson;

  beforeEach(() => {
    config = {
      path: '@endemolshinegroup/cz-github',
    };
    pkg = {
      name: '@endemolshinegroup/cz-github',
    };
  });

  it('creates valid prompts', () => {
    const result = createPrompts({ config, pkg });
    expect(result).toHaveLength(6);
    const scopePrompt = find(result, ['name', 'scope']) as Question;
    expect(scopePrompt.choices).toBeUndefined();
  });

  it('loads user-defined scopes if any are found', () => {
    const pullRequestsConfig = {
      ...config,
      '@endemolshinegroup/cz-github': {
        scopes: {
          api: 'API',
          site: 'Site',
        },
      },
    };
    const result = createPrompts({ config: pullRequestsConfig, pkg });
    expect(result).toHaveLength(6);

    const scopePrompt = find(result, ['name', 'scope']) as Question;
    expect(scopePrompt.choices).toHaveLength(2);
  });
});
