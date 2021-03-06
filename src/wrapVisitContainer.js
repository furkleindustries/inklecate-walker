import {
  InkNodeTypes,
} from './InkNodeTypes';

export const wrapVisitContainer = ({
  story,
  tree,
}) => {
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

    const {
      iterationIndex,
      pathHistories: { [iterationIndex]: pathHistory },
    } = tree;

    if (iterationIndex === undefined || pathHistory === undefined) {
      return;
    }

    pathHistory.push({
      containerId,
      id,
      iterationIndex,
      turnIndex,
      type: InkNodeTypes.ContainerVisit,
    });

    return oldVisitContainer(container, atStart);
  };
};
