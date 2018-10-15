import createPrompts from './createPrompts';
import formatCommit from './formatCommit';
import { CommitizenConfig, Prompter } from './types';
import { loadConfig } from './util';

import pkg from '../package.json';

let config: CommitizenConfig;
try {
  config = loadConfig();
} catch (error) {
  process.stderr.write(
    `Could not load project's Commitizen configuration from ${process.cwd()}.`,
  );
}

export const prompter: Prompter = (cz, commit) => {
  const prompts = createPrompts({ config, pkg });

  return cz
    .prompt(prompts)
    .then(formatCommit)
    .then(commit);
};
