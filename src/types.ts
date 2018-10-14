import { Inquirer } from 'inquirer';

export type CommitCallback = (commitMessage: string) => void;
export type Prompter = (cz: Inquirer, commit: CommitCallback) => void;

export interface CommitizenConfig {
  [key: string]: string | AdapterConfig | undefined;
  path: string;
  '@endemolshinegroup/cz-github'?: AdapterConfig;
}

export interface ConventionalCommitTypes {
  types: {
    [key: string]: {
      description: string;
      name: string;
    };
  };
}

export interface AdapterConfig {
  scopes?: {
    [key: string]: string;
  };
}

export interface PackageJson {
  name: string;
}
