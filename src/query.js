module.exports = ({ nodeMap }, id) => new Promise((resolve) => resolve(
  id in nodeMap ? nodeMap[id] : null
));
