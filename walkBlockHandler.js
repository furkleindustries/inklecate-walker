const getLastIds = require('./getLastIds');

module.exports = ({
  lines,
  nodeMap,
  pathHistory,
  story,
  story: {
    currentChoices,
    state: {
      currentTurnIndex: turnIndex,
    },
  },
}) => {
  if (!currentChoices.length) {
    return [];
  }

  const {
    lastContainerId: containerId,
    lastContentPath: id,
  } = getLastIds(pathHistory);

  pathHistory.push({
    containerId,
    id,
    turnIndex,
    type: 'choicePoint',
  });

  const choicePoint = currentChoices.map(({
    sourcePath,
    targetPath,
    text: content,
  }) => {
    if (!targetPath) {
      throw new Error('No source path found in choice. This is a fatal error.');
    }

    const id = targetPath.componentsString;
    const containerId = sourcePath || null;

    const historyItem = {
      content,
      turnIndex,
    };

    if (id in nodeMap) {
      nodeMap[id].history.push(historyItem);
    } else {
      nodeMap[id] = {
        containerId,
        history: [ historyItem ],
        id,
        turnIndex,
        type: 'choice',
      };
    }

    pathHistory.push({
      containerId,
      id,
      turnIndex,
      type: 'choice',
    });

    return id;
  });

  const block = [
    ...lines,
    choicePoint,
  ];

  return block;
};
