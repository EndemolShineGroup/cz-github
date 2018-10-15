import { Answers } from 'inquirer';

export default (answers: Answers) => {
  return !!answers.isIssueAffected;
};
