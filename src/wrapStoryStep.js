import {
  InkNodeTypes,
} from './InkNodeTypes';

export const wrapStoryStep = ({
  story,
  tree,
}) => {
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
      type: InkNodeTypes.Step,
    });

    return oldStep();
  };
};
