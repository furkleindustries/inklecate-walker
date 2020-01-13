module.exports = (story, { pathHistory }) => {
  const oldNextContent = story.NextContent.bind(story);
  story.NextContent = () => {
    const {
      state: {
        currentPathString: id,
        currentPointer: {
          container: {
            parent: {
              path: { componentsString: containerId },
            },
          },
        },

        currentTurnIndex: turnIndex,
      },
    } = story;

    pathHistory.push({
      containerId,
      id,
      turnIndex,
      type: 'nextContent',
    });

    return oldNextContent();
  };
};
