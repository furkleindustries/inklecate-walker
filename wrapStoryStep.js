module.exports = (
  story,
  { pathHistory },
) => {
  const oldStep = story.Step.bind(story);
  story.Step = () => {
    const {
      state: {
        currentPathString: id,
        currentPointer: {
          container: {
            path: { componentsString: containerId },
          },
        },

        currentTurnIndex: turnIndex,
      },
    } = story;


    pathHistory.push({
      containerId,
      id,
      turnIndex,
      type: 'step',
    });

    return oldStep();
  };
};
