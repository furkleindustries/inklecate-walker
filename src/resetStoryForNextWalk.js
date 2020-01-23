import {
  Story,
} from 'inkjs/engine/Story';
import {
  wrapNextContent,
} from './wrapNextContent';

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

  /**
   * Wrap and instrument the `Story.NextContent` function. This is necessary
   * to keep reference to the content pointers and their containers.
   */
  wrapNextContent({
    story: newStory,
    tree,
  });

  return resolve(newStory);
});
