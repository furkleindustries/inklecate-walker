import {
  InkNodeTypes,
} from './InkNodeTypes';

export const filterTree = ({
  overload,
  story,
  tree,
}) => new Promise(async (resolve, reject) => {
  if (typeof overload === 'function') {
    try {
      return resolve(await overload({
        tree,
        story,
      }));
    } catch (err) {
      return reject(err);
    }
  }

  tree.pathHistories = tree.pathHistories.map((pathHistory) => (
    pathHistory.filter(({ type }) => type !== InkNodeTypes.NextContent)
  ));

  return resolve(tree);
});
