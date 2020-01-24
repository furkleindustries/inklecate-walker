import {
  getLastIds,
} from './getLastIds';
import {
  InkNodeTypes,
} from './InkNodeTypes';

export const walkBlockHandler = ({
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
    type: InkNodeTypes.ChoicePoint,
  });

  currentChoices.forEach(({
    sourcePath,
    targetPath,
    text: content,
  }, choiceIndex) => {
    if (!sourcePath) {
      return reject(new Error(
        'No source path found in choice. This is a fatal error.'
      ));
    } else if (!targetPath) {
      return reject(new Error(
        'No target path found in choice. This is a fatal error.'
      ));
    }

    const {
      componentsString: id,
    } = sourcePath;

    const {
      componentsString: targetId,
    } = targetPath;

    const historyItem = {
      choiceIndex,
      containerId,
      content,
      id,
      iterationIndex,
      targetId,
      turnIndex,
      type: InkNodeTypes.Choice,
    };

    if (id in nodeMap) {
      nodeMap[id].history.push(historyItem);
    } else {
      nodeMap[id] = {
        containerId,
        history: [ historyItem ],
        id,
        turnIndex,
        type: InkNodeTypes.Choice,
      };
    }

    pathHistory.push({
      containerId,
      id,
      iterationIndex,
      turnIndex,
      type: InkNodeTypes.Choice,
    });
  });

  return resolve();
});
