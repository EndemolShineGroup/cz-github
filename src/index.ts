import createPrompts from './lib/createPrompts';
import formatCommit from './lib/formatCommit';
import { loadConfig } from './lib/util';
import { CommitizenConfig, Prompter } from './types';

const pkg = require('../package.json');

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
