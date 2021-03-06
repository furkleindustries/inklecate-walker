import {
  getContentItemHistory,
} from './getContentItemHistory';
import {
  printPlaythroughFromItemHistory,
} from './printPlaythroughFromItemHistory';
import {
  printPlaythroughFromTree,
} from './printPlaythroughFromTree';
import {
  query,
} from './query';
import {
  validateTreeWithErrorOnFail,
} from './validateTreeWithErrorOnFail';
import {
  wrapNextContent,
} from './wrapNextContent';

export const initializeTree = ({
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

  tree.getContentItemHistory = (iterationIndex, overload) => (
    getContentItemHistory({
      iterationIndex,
      nodeMap: tree.nodeMap,
      pathHistories: tree.pathHistories,
      overload,
    })
  );

  tree.getPrintout = (iterationIndex, overloads) => printPlaythroughFromTree({
    iterationIndex,
    nodeMap: tree.nodeMap,
    pathHistories: tree.pathHistories,
    overloads,
  });

  tree.getPrintoutFromContentItemHistory = (itemHistory, overload) => (
    printPlaythroughFromItemHistory({
      itemHistory,
      overload,
    })
  );

  tree.queryNode = query.bind(null, tree);

  return resolve(tree);
});
