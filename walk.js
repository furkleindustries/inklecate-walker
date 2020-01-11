const getNextLines = require('./getNextLines');
const walkBlockHandler = require('./walkBlockHandler');
const walkLineHandler = require('./walkLineHandler');
const wrapStoryStep = require('./wrapStoryStep');

const walk = (story) => {
  const tree =  {
    id: '__TREE__',
    nodeMap: {},
    pathHistory: [],
    stateHistory: [],
    tickCount: 0,
    type: 'tree',
  };

  const {
    nodeMap,
    pathHistory,
    stateHistory,
  } = tree;

  wrapStoryStep(story, tree);

  let done = false;

  while (!done) {
    /**
     * Get the path string before continuing.
     */
    const {
      state: {
        currentPathString,
        currentTurnIndex,
      },
    } = story;

    /**
     * Collect all the available outputs from the story, both text and tags, and
     * put them in line AST nodes.
     */
    const lines = getNextLines(story)
      /**
       * Apply the walkLineHandler to each line.
       */
      .map((line) => walkLineHandler({
        currentPathString,
        currentTurnIndex,
        line,
        nodeMap,
        pathHistory,
        story,
      }))
      /**
       * Remove any lines discarded by the handler as null or undefined.
       */
      .filter(Boolean);

    const {
      currentChoices: choices,
      state: { variablesState },
    } = story;

    /**
     * Apply the block handler. This copies references to all content in the
     * block to the node map.
     */
    walkBlockHandler({
      choices,
      currentPathString,
      currentTurnIndex,
      lines,
      nodeMap,
      pathHistory,
    });

    stateHistory.push({
      content: variablesState.jsonToken,
      id: currentPathString,
      turnIndex: currentTurnIndex,
    });

    if (!story.currentChoices.length) {
      done = true;
    } else {
      story.ChooseChoiceIndex(Math.floor(Math.random() * story.currentChoices.length));
    }
  }

  tree.tickCount += 1;

  return tree;
};

module.exports = walk;
