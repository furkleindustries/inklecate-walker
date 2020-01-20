import {
  initializeTree,
} from './initializeTree';
import {
  walkIteratively,
} from './walkIteratively';

export const walk = ({
  inputFilepath = '__NONE__',
  iterationCount = 1,
  overloads = {},
  story,
}) => new Promise(async (resolve, reject) => {
  let tree;
  try {
    tree = await initializeTree({
      inputFilepath,
      iterationCount,
      overload: overloads && typeof overloads.initializeTree === 'function' ?
        overloads.initializeTree :
        undefined,

      story,
    });
  } catch (err) {
    return reject(err);
  }

  try {
    tree = await walkIteratively({
      overloads,
      story,
      tree,
    });
  } catch (err) {
    return reject(err);
  }

  return resolve(tree);
});
