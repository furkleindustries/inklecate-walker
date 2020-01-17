const { NextContent } = require('./InkPathHistoryTypes');

module.exports = ({
  overload,
  tree,
  tree: {
    iterationIndex,
    pathHistories: { [iterationIndex]: pathHistory },
  },

  story,
}) => new Promise(async (resolve, reject) => {
  if (typeof overload === 'function') {
    try {
      return resolve(await overload({
        tree,
        story,
      }));
    } catch (err) {
      return reject(err);
    }
  }

  tree.pathHistories = tree.pathHistories.map((pathHistory) => (
    pathHistory.filter(({ type }) => type !== NextContent)
  ));

  return resolve(tree);
});
