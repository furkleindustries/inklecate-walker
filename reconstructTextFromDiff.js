module.exports = (diff) => diff.reduce((str, item) => (
  str + item[0] >= 0 ? item[1] : ''
), '');
