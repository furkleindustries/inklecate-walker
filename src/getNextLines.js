import {
  getLastIds,
} from './getLastIds';
import {
  InkNodeTypes,
} from './InkNodeTypes';

export const getNextLines = ({
  overload,
  story,
  tree,
  tree: { iterationIndex },
}) => new Promise(async (resolve, reject) => {
  if (typeof overload === 'function') {
    try {
      return resolve(await overload({
        story,
        tree,
      }));
    } catch (err) {
      return reject(err);
    }
  }

  const lines = [];

  while (story.canContinue) {
    story.Continue();

    const {
      currentTags: tags,
      currentText: text,
      state: { currentTurnIndex: turnIndex },
    } = story;

    const {
      containerId,
      id,
    } = getLastIds(tree);

    const type = InkNodeTypes.Line;
    if (text.trim() || tags.length) {
      lines.push({
        containerId,
        history: [
          {
            containerId,
            content: {
              tags,
              text,
            },

            id,
            iterationIndex,
            turnIndex,
            type,
          },
        ],

        id,
        type: InkNodeTypes.Line,
      });
    }
  }

  return resolve(lines);
});
