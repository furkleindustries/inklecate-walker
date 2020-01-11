module.exports = (
  story,
  { pathHistory },
) => {
  const oldStep = story.Step.bind(story);
  story.Step = () => {
    pathHistory.push({
      id: story.state.currentPathString,
      turnIndex: story.state.currentTurnIndex,
      type: 'step',
    });

    debugger;
    oldStep();
  };
};
