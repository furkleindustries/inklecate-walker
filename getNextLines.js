const getLastIds = require('./getLastIds');

module.exports = (
  story,
  pathHistory,
) => {
  const lines = [];
  let lastContainerId = null;
  let lastContentPath = null;

  while (story.canContinue) {
    story.Continue();

    const {
      currentTags: tags,
      currentText: text,
      state: { currentTurnIndex },
    } = story;

    const ids = getLastIds(pathHistory);
    lastContainerId = ids.lastContainerId;
    lastContentPath = ids.lastContentPath;

    if (text.trim() || tags.length) {
      lines.push({
        containerId: lastContainerId,
        history: [
          {
            content: {
              tags,
              text,
            },

            turnIndex: currentTurnIndex,
          },
        ],

        id: lastContentPath,
        type: 'line',
      });
    }
  }

  return lines;
};
