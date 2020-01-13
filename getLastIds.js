module.exports = (pathHistory) => {
  let lastContainerId = null;
  let lastContentPath = null;
  for (let ii = pathHistory.length - 1; ii >= 0; ii -= 1) {
    if (pathHistory[ii].type === 'nextContent') {
      lastContainerId = pathHistory[ii].containerId;
      lastContentPath = pathHistory[ii].id;

      break;
    }
  }

  return {
    lastContainerId,
    lastContentPath,
  };
};
