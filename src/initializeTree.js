const printPlaythroughFromTree = require('./printPlaythroughFromTree');
const validateTreeWithErrorOnFail = require('./validateTreeWithErrorOnFail');
const wrapNextContent = require('./wrapNextContent');

module.exports = ({
  inputFilepath,
  iterationCount,
  overload,
  story,
}) => new Promise(async (resolve, reject) => {
  let tree;
  if (typeof overload === 'function') {
    try {
      tree = await overload({
        inputFilepath,
        iterationCount,
        story,
      });
    } catch (err) {
      return reject(err);
    }

    /**
     * If the output is falsy, which is to say that it would cause an error if
     * the below assignments were carried out, the below function is guaranteed
     * to error. This is done to guarantee the same error is thrown from the
     * same location.
     */
    if (!tree) {
      try {
        validateTreeWithErrorOnFail(tree);
      } catch (err) {
        return reject(err);
      }
    }
  } else {
    tree = {
      inputFilepath,
      iterationCount,
      iterationIndex: 0,
      namedContentVisits: [],
      nodeMap: {},
      pathHistories: [],
      stateHistories: [],
      tickCounts: [],
    };  
  }

  /**
   * Wrap and instrument the `Story.NextContent` function. This is necessary
   * to keep reference to the content pointers and their containers.
   */
  wrapNextContent({
    story,
    tree,
  });

  try {
    validateTreeWithErrorOnFail(tree);
  } catch (err) {
    return reject(err);
  }

  tree.getPrintout = printPlaythroughFromTree.bind(null, tree);

  return resolve(tree);
});
