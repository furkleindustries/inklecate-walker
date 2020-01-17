const getHistoryItemAtIterationAndTurnIndex = require('./getHistoryItemAtIterationAndTurnIndex');
const getNamedContentContainerPaths = require('./getNamedContentContainerPaths');
const {
  Choice,
  ChoicePoint,
  ChoiceSelection,
  Line,
} = require('./InkPathHistoryTypes');
const query = require('./query');

module.exports = ({
  nodeMap,
  pathHistories,
}, iterationIndex) => new Promise(async (resolve, reject) => {
  const pathHistory = pathHistories[iterationIndex];
  const strArr = [];
  let lastNamedContentContainerPath = null;
  let lastRootNamedContentContainerPath = null;
  let lastTurnIndex = -1;

  await Promise.all(pathHistory.map(async ({
    choiceIndex,
    id,
    turnIndex,
    type,
  }) => new Promise(async (resolve) => {
    if (turnIndex > lastTurnIndex) {
      strArr.push(`The turn index is now ${turnIndex}.\n`);
    }

    lastTurnIndex = turnIndex;

    let node;
    try {
      node = await query({ nodeMap }, id);
    } catch (err) {
      return reject(err);
    }

    const item = node ?
      getHistoryItemAtIterationAndTurnIndex({
        iterationIndex,
        node,
        turnIndex,
      }) || {} :
      null;

    if (type === Line) {
      const paths = getNamedContentContainerPaths(id);
      if (paths.length) {
        const rootPath = paths[0];
        const thisPath = paths[paths.length - 1];
        if (rootPath !== lastRootNamedContentContainerPath) {
          lastRootNamedContentContainerPath = rootPath;
          strArr.push(`\n=== ${rootPath} ===`);
        }
  
        if (thisPath !== lastNamedContentContainerPath &&
          thisPath !== rootPath)
        {
          lastNamedContentContainerPath = thisPath;
          strArr.push(`= ${thisPath} =`);
        }
      }
    }

    /**
     * Can't `else if` here because we need to check for `Line` again.
     */
    if (type === Choice && item && item.content) {
      strArr.push(`* (${id}) ${item.content}`);
    } else if (type === ChoicePoint) {
      strArr.push(`*** (${id})`);
    } else if (type === ChoiceSelection) {
      strArr.push(`> (${id}) #${choiceIndex + 1}`);
      strArr.push('***\n');
    } else if (type === Line && item && item.content) {
      const {
        content: {
          tags,
          text,
        },
      } = item;

      if (Array.isArray(tags) && tags.length) {
        strArr.push(`# ${tags.join('\n# ')}\n`);
      }

      if (text) {
        strArr.push(`(${id}) ${text}`);
      }
    }

    return resolve();
  })));

  const printout = strArr.join('\n');

  return resolve(printout);
});
