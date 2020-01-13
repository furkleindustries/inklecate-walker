module.exports = ({ history }, turnIndex) => {
  for (let ii = history.length - 1; ii >= 0; ii -= 1) {
    if (history[ii].turnIndex <= turnIndex) {
      return history[ii];
    }
  }

  return null;
};
