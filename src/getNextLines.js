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
            type: Line,
          },
        ],

        id,
        type: Line,
      });
    }
  }

  return resolve(lines);
});
