const getLastIds = require('./getLastIds');

module.exports = ({
  line,
  line: {
    containerId,
    id,
    history,
  },
  nodeMap,
  pathHistory,
  story: {
    state: { currentTurnIndex: turnIndex },
  },
}) => {
  if (id in nodeMap) {
    nodeMap[id].history.push(...history);
  } else {
    nodeMap[id] = line;
  }

  pathHistory.push({
    containerId,
    id,
    turnIndex,
    type: 'line',
  });

  return line;
};
