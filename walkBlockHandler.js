module.exports = ({
  choices,
  currentPathString,
  currentTurnIndex,
  lines,
  nodeMap,
  pathHistory,
}) => {
  if (!choices.length) {
    return [];
  }

  pathHistory.push({
    id: currentPathString,
    turnIndex: currentTurnIndex,
    type: 'choicePoint',
  });

  const choicePoint = choices.map(({
    sourcePath,
    text,
  }) => {
    if (!sourcePath) {
      throw new Error('No source path found in choice. This is a fatal error.');
    }

    if (sourcePath in nodeMap) {
      nodeMap[sourcePath].visits.push({     
        content: text,
        id: sourcePath,
        turnIndex: currentTurnIndex,
      });
    } else {
      nodeMap[sourcePath] = {
        id: sourcePath,
        type: 'choice',
        visits: [
          {     
            content: text,
            id: sourcePath,
            turnIndex: currentTurnIndex,
          },
        ],
      };
    }

    pathHistory.push({
      id: sourcePath,
      turnIndex: currentTurnIndex,
      type: 'choice',
    });

    return sourcePath;
  });

  const visit = {
    id: currentPathString,
    turnIndex: currentTurnIndex,
  };

  if (currentPathString in nodeMap) {
    nodeMap[currentPathString].visits.push(visit);
  } else {
    nodeMap[currentPathString] = {
      id: currentPathString,
      type: 'choicePoint',
      visits: [ visit ],
    };
  }

  const block = [
    ...lines,
    choicePoint,
  ];

  return block;
};
