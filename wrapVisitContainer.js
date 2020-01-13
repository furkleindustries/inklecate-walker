module.exports = (story, { pathHistory }) => {
  const oldVisitContainer = story.VisitContainer.bind(story);
  story.VisitContainer = (container, atStart) => {
    const {
      parent: {
        path: { componentsString: containerId },
      },

      path: { componentsString: id },
    } = container;

    const {
      state: { currentTurnIndex: turnIndex },
    } = story;

    pathHistory.push({
      containerId,
      id,
      turnIndex,
      type: 'containerVisit',
    });

    return oldVisitContainer(container, atStart);
  };
};
