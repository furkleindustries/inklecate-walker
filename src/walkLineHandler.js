import {
  InkNodeTypes,
} from './InkNodeTypes';

export const walkLineHandler = ({
  line,
  line: {
    containerId,
    id,
    history,
  },

  overload,
  story: {
    state: { currentTurnIndex: turnIndex },
  },

  tree: {
    iterationIndex,
    nodeMap,
    pathHistories: { [iterationIndex]: pathHistory },
  },
}) => new Promise(async (resolve, reject) => {
  if (typeof overload === 'function') {
    try {
      return resolve(await overload({
        line,
        story,
        tree,
      }));
    } catch (err) {
      return reject(err);
    }
  }

  if (id in nodeMap) {
    nodeMap[id].history.push(...history);
  } else {
    nodeMap[id] = line;
  }

  const type = InkNodeTypes.Line;

  pathHistory.push({
    containerId,
    id,
    iterationIndex,
    turnIndex,
    type,
  });

  return resolve();
});
