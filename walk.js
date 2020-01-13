const collectVisitsForTreePostRun = require('./collectVisitsForTreePostRun');
const filterTree = require('./filterTree');
const getLastIds = require('./getLastIds');
const getNextLines = require('./getNextLines');
const initializeVisitsForTree = require('./initializeVisitsForTree');
const printPlaythroughFromTree = require('./printPlaythroughFromTree');
const walkBlockHandler = require('./walkBlockHandler');
const walkLineHandler = require('./walkLineHandler');
const wrapNextContent = require('./wrapNextContent');
// const wrapStoryStep = require('./wrapStoryStep');
// const wrapVisitContainer = require('./wrapVisitContainer');

const walk = (story) => {
  const tree =  {
    id: '__TREE__',
    nodeMap: {},
    pathHistory: [],
    printout: null,
    stateHistory: [],
    tickCount: 0,
    type: 'tree',
  };

  Object.assign(tree, initializeVisitsForTree(story, tree));

  const {
    nodeMap,
    pathHistory,
    stateHistory,
  } = tree;

  wrapNextContent(story, tree);
  // wrapStoryStep(story, tree);
  // wrapVisitContainer(story, tree);

  let done = false;

  while (!done) {
    const {
      state: { currentTurnIndex: turnIndex },
    } = story;

    /**
     * Collect all the available outputs from the story, both text and tags, and
     * put them in line AST nodes.
     */
    const lines = getNextLines(story, pathHistory)
      /**
       * Apply the walkLineHandler to each line.
       */
      .map((line) => walkLineHandler({
        line,
        nodeMap,
        pathHistory,
        story,
      }))
      /**
       * Remove any lines discarded by the handler as null or undefined.
       */
      .filter(Boolean);

    /**
     * Apply the block handler. This copies references to all content in the
     * block to the node map.
     */
    walkBlockHandler({
      lines,
      nodeMap,
      pathHistory,
      story,
    });

    const {
      currentChoices,
      variablesState: { jsonToken: content },
    } = story;

    const {
      lastContainerId: containerId,
      lastContentPath: id,
    } = getLastIds(pathHistory);

    stateHistory.push({
      content,
      id,
      turnIndex,
    });

    if (!currentChoices.length) {
      done = true;
    } else {
      const choiceIndex = Math.floor(Math.random() * currentChoices.length);
      const {
        targetPath: { componentsString: id },
      } = currentChoices[choiceIndex];

      pathHistory.push({
        choiceIndex,
        containerId,
        id,
        turnIndex,
        type: 'choiceSelection',
      });

      story.ChooseChoiceIndex(choiceIndex);
    }
  }

  Object.assign(tree, filterTree(tree));
  Object.assign(tree, collectVisitsForTreePostRun(story, tree));

  tree.tickCount += 1;
  tree.printout = printPlaythroughFromTree(tree);

  return tree;
};

module.exports = walk;
