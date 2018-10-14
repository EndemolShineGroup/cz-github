export default (input?: string) => {
  if (!input) {
    return 'Must specify issue IDs';
  }

  const lowerCasedInput = input.toLocaleLowerCase();
  if (lowerCasedInput === 'develop' || lowerCasedInput === 'master') {
    return [
      `You should not commit directly to the ${lowerCasedInput} branch.`,
      'Please create a feature branch first.',
    ].join(' ');
  }
  return /#\d+/.test(input);
};
