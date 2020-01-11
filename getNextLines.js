module.exports = (story) => {
  const lines = [];

  while (story.canContinue) {
    const currentPathString = story.state.currentPathString;

    if (story.currentText.trim() || story.currentTags.length) {
      lines.push({
        id: currentPathString,
        visits: [
          {
            content: {
              text: story.currentText,
              tags: story.currentTags,
            },

            id: story.state.currentPathString,
            turnIndex: story.state.currentTurnIndex,
          },
        ],
        type: 'line',
      });
    }

    story.Continue();
  }

  return lines;
};
