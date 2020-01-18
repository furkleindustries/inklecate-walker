const getHistoryItemAtIterationAndTurnIndex = require('./getHistoryItemAtIterationAndTurnIndex');
const query = require('./query');

module.exports = ({
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
  pathHistory.forEach(async ({
    id,
    turnIndex,
  }) => {
    let node;
    try {
      node = await query({ nodeMap }, id);
    } catch (err) {
      return reject(err);
    }

    if (node) {
      const item = getHistoryItemAtIterationAndTurnIndex({
        iterationIndex,
        node,
        turnIndex,
      });

      if (item) {
        items.push(item);
      }
    }

    return resolve(items);
  });
});
