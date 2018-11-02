export default (input: string) => {
  let regex = /[A-Z]/g;

  // If it does not find a capital letter return true
  if (input.match(regex) !== null) {
    return 'The value must be all lowercase';
  }

  return true;
};
