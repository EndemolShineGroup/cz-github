import os from 'os';

export const isIssueAffected = true;
export const issues = '#11 #65 #3168';
export const subject = 'This took waaaaay too long';
export const type = 'build';
export const scope = 'api';
export const body =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const formattedBody = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
  'nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu',
  'fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in',
  'culpa qui officia deserunt mollit anim id est laborum.',
].join(os.EOL);
