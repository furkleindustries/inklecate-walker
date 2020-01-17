const {
  NextContent,
} = require('./InkPathHistoryTypes');

module.exports = ({
  iterationIndex,
  pathHistories,
  pathHistories: { [iterationIndex]: pathHistory },
}) => {
  for (let ii = pathHistory.length - 1; ii >= 0; ii -= 1) {
    const item = pathHistory[ii];
    const {
      containerId,
      id,
      type,
    } = item;

    if (type === NextContent) {
      return {
        containerId,
        id,
      }; 
    }
  }

  return {
    containerId: null,
    id: null,
  };
};
