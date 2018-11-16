import validateLowercase from './validateLowercase';

export default (input: string, answers: any) => {
  if (answers.isBreak && (!input || input === '')) {
    return 'Must specify a description for breaking changes';
  }

  return validateLowercase(input);
};
