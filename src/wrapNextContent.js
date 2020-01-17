const { NextContent } = require('./InkPathHistoryTypes');

module.exports = ({
  story,
  tree,
}) => {
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
      type: NextContent,
    });

    return oldNextContent();
  };
};
