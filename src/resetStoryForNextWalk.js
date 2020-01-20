import {
  Story,
} from 'inkjs/engine/Story';

export const resetStoryForNextWalk = ({
  overload,
  story,
  tree,
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

  const newStory = new Story(story.ToJsonString());

  return resolve(newStory);
});
