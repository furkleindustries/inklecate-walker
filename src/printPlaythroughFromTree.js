const getContentItemHistory = require('./getContentItemHistory');
const printPlaythroughFromItemHistory = require('./printPlaythroughFromItemHistory');

module.exports = ({
  nodeMap,
  pathHistories,
  overloads,
}, iterationIndex) => new Promise(async (resolve, reject) => {
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

  const itemHistory = getContentItemHistory({
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
