export const query = (
  { nodeMap },
  id,
  {
    iterationIndexInHistory,
    turnIndexInHistory,
    type,
    typeInHistory,
  } = {},
) => new Promise((resolve) => {
  let queried;
  if (id in nodeMap) {
    queried = nodeMap[id];
    if (type && queried.type !== type) {
      return null;
    }

    if (queried &&
      typeInHistory &&
      queried.history.find(({ type }) => type === typeInHistory))
    {
      return null;
    }

    if (queried &&
      iterationIndexInHistory >= 0 &&
      !queried.history.find(({ iterationIndex }) => (
        iterationIndex === iterationIndexInHistory
      )))
    {
      return null
    }

    if (queried &&
      turnIndexInHistory >= 0 &&
      !queried.history.find(({ turnIndex }) => (
        turnIndex === turnIndexInHistory
      ))
    ) {
      return null;
    }
  }

  return resolve(queried || null)
});
