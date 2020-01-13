module.exports = (tree) => {
  tree.pathHistory = tree.pathHistory.filter(({ type }) => (
    type !== 'nextContent'
  ))

  return tree;
};
