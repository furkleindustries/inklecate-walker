module.exports = (tree) => {
  if (!tree) {
    throw new Error(
      'The tree output from the initializeTree overload was falsy.'
    );
  }

  return true;
};
