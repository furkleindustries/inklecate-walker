import {
  getChoiceAndIndexFromChoiceList,
} from './getChoiceAndIndexFromChoiceList';
import {
  getLastIds,
} from './getLastIds';
import {
  getNextLines,
} from './getNextLines';
import {
  InkNodeTypes,
} from './InkNodeTypes';
import {
  makeChoice,
} from './makeChoice';
import {
  walkBlockHandler,
} from './walkBlockHandler';
import {
  walkLineHandler,
} from './walkLineHandler';

export const walkSingleTick = ({
  overloads,
  story,
  tree,
  tree: {
    iterationIndex,
    pathHistories: { [iterationIndex]: pathHistory },
    stateHistories: { [iterationIndex]: stateHistory },
  },
}) => new Promise(async (resolve, reject) => {
  /**
   * Allow the caller to overload the entire function.
   */
  if (overloads && typeof overloads.walkSingleTick === 'function') {
    try {
      return resolve(await overloads.walkSingleTick({
        story,
        tree,
      }));
    } catch (err) {
      return reject(err);
    }
  }

  try {
    /**
     * Collect all the available outputs from the story, both text and tags,
     * and put them in line AST nodes.
     */
    (await getNextLines({
      overload: overloads && typeof overloads.getNextLines === 'function' ?
        overloads.getNextLines :
        undefined,

      story,
      tree,
    }))
      /**
       * Apply the walkLineHandler to each line.
       */
      .forEach(async (line) => await walkLineHandler({
        line,
        overload: overloads && typeof overloads.lineHandler === 'function' ?
          overload.lineHandler :
          undefined,

        story,
        tree,
      }));
  } catch (err) {
    return reject(err);
  }

  try {
    /**
     * Apply the block handler. This copies references to all content in the
     * block to the node map.
     */
    await walkBlockHandler({
      overload: overloads && typeof overloads.blockHandler === 'function' ?
        overload.blockHandler :
        undefined,

      story,
      tree,
    });
  } catch (err) {
    return reject(err);
  }

  /**
   * We must destructure this after walking the block, otherwise they may not be
   * up to date. (Will investigate that further, but I don't want to count on
   * it.)
   */
  const {
    state: { currentTurnIndex: turnIndex },
    variablesState: { jsonToken: content },
  } = story;

  /**
   * Scrape the last seen path IDs for the content and container. These cannot
   * be trusted from current state after the block is walked, and must be
   * determined through the values gleaned by wrapping and instrumenting the
   * `Story.NextContent` function.
   */
  const {
    containerId,
    id,
  } = getLastIds(tree);

  /**
   * Push an item to the state history list.
   */
  stateHistory.push({
    content,
    id,
    iterationIndex,
    turnIndex,
  });

  /**
   * Get a choice from the existing choice list. By default, this value is
   * selected at random.
   */
  let choice;
  let choiceIndex;
  try {
    const result = getChoiceAndIndexFromChoiceList({
      overload: overloads &&
        typeof overloads.getChoiceAndIndexFromChoiceList === 'function' ?
          overloads.getChoiceAndIndexFromChoiceList :
          undefined,

      story,
      tree,
    });

    choice = result.choice;
    choiceIndex = result.choiceIndex;
  } catch (err) {
    return reject(err);
  }

  /**
   * If no choices remain, both the tick and the iteration are over.
   */
  if (!choice) {
    return resolve(false);
  }

  const {
    targetPath: { componentsString: targetId },
  } = choice;

  /**
   * Push an item to the path history reflecting the choice selection.
   */
  pathHistory.push({
    choiceIndex,
    containerId,
    id: targetId,
    iterationIndex,
    turnIndex,
    type: InkNodeTypes.ChoiceSelection,
  });

  try {
    /**
     * Instruct the Story to perform the choice in question.
     */
    await makeChoice({
      choice,
      choiceIndex,
      overload: overloads && typeof overload.makeChoice === 'function' ?
        overload.makeChoice :
        undefined,

      story,
      tree,
    });
  } catch (err) {
    return reject(err);
  }

  return resolve(true);
});
