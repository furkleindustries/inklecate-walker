export const getHistoryItemAtIterationAndTurnIndex = ({
  iterationIndex,
  node: { history },
  // node,
  turnIndex,
}) => {
  for (let ii = history.length - 1; ii >= 0; ii -= 1) {
    const { [ii]: item } = history;

    if (item.iterationIndex === iterationIndex &&
        item.turnIndex <= turnIndex)
    {
      return item;
    }
  }

  return null;
};
