module.exports = ({
  currentPathString,
  currentTurnIndex,
  line,
  nodeMap,
  pathHistory,
}) => {
  if (!(line.id in nodeMap)) {
    nodeMap[line.id] = line;
  } else {
    nodeMap[line.id].visits.push({
      content: {
        tags: line.tags,
        text: line.text,
      },

      id: currentPathString,
      turnIndex: currentTurnIndex,
    });
  }

  pathHistory.push({
    id: line.id,
    turnIndex: currentTurnIndex,
    type: 'line',
  });

  return line;
};
