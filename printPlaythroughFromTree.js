const getHistoryItemAtTurnIndex = require('./getHistoryItemAtTurnIndex');
const getNamedContentContainerPaths = require('./getNamedContentContainerPaths');
const query = require('./query');

module.exports = ({
  nodeMap,
  pathHistory,
}) => {
  const strArr = [];

  let lastNamedContentContainerPath = null;
  let lastRootNamedContentContainerPath = null;
  let lastTurnIndex = -1;
  pathHistory.forEach(({
    choiceIndex,
    id,
    turnIndex,
    type,
  }) => {
    if (turnIndex > lastTurnIndex) {
      strArr.push(`The turn index is now ${turnIndex}.\n`);
    }

    lastTurnIndex = turnIndex;

    const node = query({ nodeMap }, id);
    const item = node ?
      getHistoryItemAtTurnIndex(node, turnIndex) || {} :
      null;

    if (type === 'line') {
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

    if (type === 'choice' && item && item.content) {
      strArr.push(`* (${id}) ${item.content}`);
    } else if (type === 'choicePoint') {
      strArr.push('***');
    } else if (type === 'choiceSelection') {
      strArr.push(`> (${id}) #${choiceIndex + 1}`);
      strArr.push('***\n');
    } else if (type === 'line' && item && item.content) {
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
  });

  const printout = strArr.join('\n');

  return printout;
};
