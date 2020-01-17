const { Story } = require('inkjs');

module.exports = ({
  overload,
  story,
  tree,
}) => new Promise(async (resolve, reject) => {
  if (typeof overload === 'function') {
    try {
      return resolve(await overloads.resetStoryForNextWalk({
        story,
        tree,
      }));
    } catch (err) {
      return reject(err);
    }
  }

  const newStory = new Story(story.ToJsonString());

  return resolve(newStory);
});
