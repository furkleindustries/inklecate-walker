import {
  getHistoryItemAtIterationAndTurnIndex,
} from './getHistoryItemAtIterationAndTurnIndex';
import {
  InkNodeTypes,
} from './InkNodeTypes';
import {
  query,
} from './query';

export const getContentItemHistory = ({
  iterationIndex,
  nodeMap,
  overload,
  pathHistories,
  pathHistories: { [iterationIndex]: pathHistory },
}) => new Promise(async (resolve, reject) => {
  if (typeof overload === 'function') {
    try {
      return resolve(await overload({
        iterationIndex,
        nodeMap,
        pathHistories,
      }));
    } catch (err) {
      return reject(err);
    }
  }

  const items = [];
  await Promise.all(pathHistory.map(({
    choiceIndex,
    id,
    turnIndex,
    type,
  }) => new Promise(async (innerResolve) => {
    let node;
    try {
      node = await query({ nodeMap }, id);
    } catch (err) {
      return reject(err);
    }

    if (node) {
      if (type === InkNodeTypes.ChoiceSelection) {
        items.push({
          containerId: null,
          content: choiceIndex,
          id: null,
          iterationIndex,
          turnIndex,
          type,
        });
      } else {
        const item = getHistoryItemAtIterationAndTurnIndex({
          iterationIndex,
          node,
          turnIndex,
        });
  
        if (item) {
          items.push(item);
        }
      }
    }

    return innerResolve();
  })));

  return resolve(items);
});
