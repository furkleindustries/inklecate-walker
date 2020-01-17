const getLastIds = require('./getLastIds');
const { Line } = require('./InkPathHistoryTypes');

module.exports = ({
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
  let lastContainerId = null;
  let lastContentPath = null;

  while (story.canContinue) {
    story.Continue();

    const {
      currentTags: tags,
      currentText: text,
      state: { currentTurnIndex },
    } = story;

    const {
      containerId,
      id,
    } = getLastIds(tree);

    lastContainerId = containerId;
    lastContentPath = id;

    if (text.trim() || tags.length) {
      lines.push({
        containerId: lastContainerId,
        history: [
          {
            content: {
              tags,
              text,
            },

            iterationIndex,
            turnIndex: currentTurnIndex,
          },
        ],

        id: lastContentPath,
        type: Line,
      });
    }
  }

  return resolve(lines);
});
