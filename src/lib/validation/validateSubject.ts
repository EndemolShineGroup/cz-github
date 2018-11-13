import validateLowercase from './validateLowercase';

export const MAXIMUM_LENGTH = 72;

export default (input: string, answers: any) => {
  if (!input || input === '') {
    return 'Must specify subject';
  }

  const isLower = validateLowercase(input.split(' ')[0]);
  if (isLower !== true) {
    return 'The first word must be lowercase';
  }

  const typeSize = answers.type.length;
  const scopeSize = answers.scope.length;

  const inputSize = input.length;

  if (typeSize + scopeSize + inputSize <= MAXIMUM_LENGTH) {
    return true;
  }

  return `Subject should be ${MAXIMUM_LENGTH -
    (typeSize + scopeSize)} characters or less`;
};
