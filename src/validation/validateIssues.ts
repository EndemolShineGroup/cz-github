export default (input?: string) => {
  if (!input) {
    return 'Must specify at least one issue ID';
  }

  const lowerCasedInput = input.toLocaleLowerCase();
  if (lowerCasedInput === 'develop' || lowerCasedInput === 'master') {
    return [
      `You should not commit directly to the ${lowerCasedInput} branch.`,
      'Please create a feature branch first.',
    ].join(' ');
  }

  if (!input.startsWith('#')) {
    return 'Issue IDs must be prefixed by #';
  }

  return /#\d+/.test(input);
};
