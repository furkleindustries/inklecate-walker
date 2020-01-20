import {
  getContentItemHistory,
} from './getContentItemHistory';
import {
  printPlaythroughFromItemHistory,
} from './printPlaythroughFromItemHistory';

export const printPlaythroughFromTree = ({
  iterationIndex,
  nodeMap,
  overloads,
  pathHistories,
}) => new Promise(async (resolve, reject) => {
  if (overloads && typeof overloads.printPlaythroughFromTree === 'function') {
    try {
      return resolve(await overloads.printPlaythroughFromTree({
        nodeMap,
        pathHistories,
      }));
    } catch (err) {
      return reject(err);
    }
  }

  const itemHistory = await getContentItemHistory({
    iterationIndex,
    nodeMap,
    overload: overloads && typeof overloads.getContentItemHistory === 'function' ?
      overloads.getContentItemHistory :
      undefined,

    pathHistories,
  });

  const printout = printPlaythroughFromItemHistory({
    itemHistory,
    overload: overloads &&
      typeof overloads.printPlaythroughFromItemHistory === 'function' ?
        overloads.printPlaythroughFromItemHistory :
        undefined,
  });

  return resolve(printout);
});
