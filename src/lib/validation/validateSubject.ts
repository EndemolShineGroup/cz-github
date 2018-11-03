import validateLowercase from './validateLowercase';

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

  if (typeSize + scopeSize + inputSize <= 100) {
    return true;
  }

  return `Subject should be ${100 - (typeSize + scopeSize)} characters or less`;
};
