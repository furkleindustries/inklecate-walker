module.exports = ({
  iterationIndex,
  node: { history },
  turnIndex,
}) => {
  for (let ii = history.length - 1; ii >= 0; ii -= 1) {
    const item = history[ii];

    if (item.iterationIndex === iterationIndex &&
        item.turnIndex <= turnIndex)
    {
      return item;
    }
  }

  return null;
};
