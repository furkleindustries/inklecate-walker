const treePostWalk = require('./treePostWalk');
const treePreWalk = require('./treePreWalk');
const walkSingleTick = require('./walkSingleTick');

module.exports = ({
  overloads,
  story: initialStory,
  tree: initialTree,
}) => new Promise(async (resolve, reject) => {
  let story = initialStory;
  let tree = initialTree;
  if (overloads && typeof overloads.walkIteratively === 'function') {
    try {
      return resolve(await overloads.walkIteratively({
        story,
        tree,
      }));
    } catch (err) {
      return reject(err);
    }
  }

  for (let ii = 0; ii < tree.iterationCount; ii += 1) {
    try {
      tree = await treePreWalk({
        overload: overloads && typeof overloads.treePreWalk === 'function' ?
          overloads.treePreWalk :
          undefined,
  
        story,
        tree,
      });
    } catch (err) {
      return reject(err);
    }

    let done = false;
    let ticks = 0;
    while (!done) {
      try {
        done = !(await walkSingleTick({
          overload: overloads && typeof overloads.walkSingleTick === 'function' ?
            overloads.walkSingleTick :
            undefined,
  
          story,
          tree,
        }));
      } catch (err) {
        return reject(err);
      }

      ticks += 1;
    }

    try {
      const {
        story: newStory,
        tree: newTree,
      } = await treePostWalk({
        overload: overloads && typeof overloads.treePostWalk === 'function' ?
          overloads.treePostWalk :
          undefined,
  
        story,
        ticks,
        tree,
      });

      story = newStory;
      tree = newTree;
    } catch (err) {
      return reject(err);
    }
  }

  return resolve(tree);
});
