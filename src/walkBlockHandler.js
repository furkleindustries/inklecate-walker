const getLastIds = require('./getLastIds');
const {
  Choice,
  ChoicePoint,
} = require('./InkPathHistoryTypes');

module.exports = ({
  overload,
  story,
  story: {
    currentChoices,
    state: { currentTurnIndex: turnIndex },
  },

  tree,
  tree: {
    iterationIndex,
    pathHistories: { [iterationIndex]: pathHistory },
    nodeMap,
  },
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
  } else if (!currentChoices.length) {
    return resolve();
  }

  const {
    containerId,
    id,
  } = getLastIds(tree);

  pathHistory.push({
    containerId,
    id,
    iterationIndex,
    turnIndex,
    type: ChoicePoint,
  });

  currentChoices.forEach(({
    sourcePath,
    targetPath,
    text: content,
  }) => {
    if (!targetPath) {
      return reject(new Error(
        'No target path found in choice. This is a fatal error.'
      ));
    }

    const { componentsString: id } = targetPath;
    const containerId = sourcePath || null;

    const historyItem = {
      containerId,
      content,
      id,
      iterationIndex,
      turnIndex,
      type: Choice,
    };

    if (id in nodeMap) {
      nodeMap[id].history.push(historyItem);
    } else {
      nodeMap[id] = {
        containerId,
        history: [ historyItem ],
        id,
        turnIndex,
        type: Choice,
      };
    }

    pathHistory.push({
      containerId,
      id,
      iterationIndex,
      turnIndex,
      type: Choice,
    });
  });

  return resolve();
});
