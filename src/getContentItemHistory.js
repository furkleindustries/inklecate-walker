const getHistoryItemAtIterationAndTurnIndex = require('./getHistoryItemAtIterationAndTurnIndex');
const { ChoiceSelection } = require('./InkPathHistoryTypes');
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
  for (const {
    choiceIndex,
    id,
    turnIndex,
  } of pathHistory) {
    let node;
    try {
      node = await query({ nodeMap }, id);
    } catch (err) {
      return reject(err);
    }

    if (node) {
      if (node.type === ChoiceSelection) {
        items.push({
          containerId: null,
          content: `> #${choiceIndex}`,
          id: null,
          iterationIndex,
          turnIndex,
          type: ChoiceSelection,
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

    if (index === pathHistory.length - 1) {
      return resolve(items);
    }
  });
});
