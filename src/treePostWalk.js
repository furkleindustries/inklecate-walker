import {
  collectVisitsForTreePostWalk,
} from './collectVisitsForTreePostWalk';
import {
  filterTree,
} from './filterTree';
import {
  resetStoryForNextWalk,
} from './resetStoryForNextWalk';

export const treePostWalk = ({
  overloads,
  story: initialStory,
  ticks,
  tree: initialTree,
}) => new Promise(async (resolve, reject) => {
  let tree = initialTree;
  let story = initialStory;

  if (overloads && typeof overloads.treePostWalk === 'function') {
    try {
      return resolve(await overloads.treePostWalk({
        story,
        tree,
      }));
    } catch (err) {
      return reject(err);
    }
  }

  try {
    /**
     * Filter items unneeded for printouts and analysis out of the tree. By
     * default, this is only items of type `nextContent`.
     */
    tree = await filterTree({
      overload: overloads && typeof overloads.filterTree === 'function' ?
        overloads.filterTree :
        undefined,

      story,
      tree,
    });
  } catch (err) {
    return reject(err);
  } 

  try {
    /**
     * Collect visits directly from inkjs after the run is complete.
     */
    tree = await collectVisitsForTreePostWalk({
      overload: overloads &&
        typeof overloads.collectVisitsForTreePostWalk === 'function' ?
          overloads.collectVisitsForTreePostWalk :
          undefined,
  
      story,
      tree,
    });
  } catch (err) {
    return reject(err);
  }

  /**
   * Increase the iteration index. When the iteration index reaches the
   * iteration count, execution will yield and the complete tree will be
   * returned to the caller.
   */
  tree.iterationIndex += 1;

  /**
   * Save how many ticks/visits it took to complete the walk.
   */

  tree.tickCounts.push(ticks);

  try {
    /**
     * Delete all transient (non-inklecated-AST) from the inkjs Story. This
     * allows another run to commence without needing to recreate (and garbage
     * collect) a new Story on each iteration.
     */
    story = await resetStoryForNextWalk({
      overload: overloads &&
        typeof overloads.resetStoryForNextWalk === 'function' ?
          overloads.resetStoryForNextWalk :
          null,

      story,
      tree,
    });
  } catch (err) {
    return reject(err);
  }

  return resolve({
    story,
    tree,
  });
});
