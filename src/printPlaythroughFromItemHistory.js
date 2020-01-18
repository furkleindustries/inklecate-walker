const getStringFromAstNodeContentItem = require('./getStringFromAstNodeContentItem');

module.exports = ({
  itemHistory,
  overloads,
}) => {
  const strArr = [];
  itemHistory.forEach((item) => {
    const ret = getStringFromAstNodeContentItem({
      item,
      overload: overloads &&
        typeof overloads.getStringFromAstNodeContentItem === 'function' ?
          overloads.getStringFromAstNodeContentItem :
          undefined,
    });

    if (ret) {
      strArr.push(String(ret));
    }
  });

  return strArr.join('\n');
};
