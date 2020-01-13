module.exports = ({ nodeMap }, query) => (
  query in nodeMap ? nodeMap[query] : null
);
