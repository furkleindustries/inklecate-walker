module.exports = ({
  overload,
  story,
  tree,
}) => new Promise(async (resolve, reject) => {
  if (typeof overload === 'function') {
    try {
      return resolve(await overload({
        story,
        tree,
      }));
    } catch (err) {
      return reject(err);
    }
  }

  tree.namedContentVisits.push({});
  tree.pathHistories.push([]);
  tree.stateHistories.push([]);

  return resolve(tree);
});
